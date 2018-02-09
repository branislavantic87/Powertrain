import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NetInfo,
  Alert,
  StatusBar,
  AsyncStorage,
  Image,
  AppState
} from 'react-native';
import RNFB from 'react-native-fetch-blob';
import axios from 'axios';
import hash from 'object-hash';
import * as Progress from 'react-native-progress';
import md5 from 'md5';
import Routes from './src/components/Routes';
import DeviceInfo from 'react-native-device-info';
import base64 from 'base-64';
import KeepAwake from 'react-native-keep-awake';
import _ from 'lodash';

export default class App extends Component {

  constructor() {
    super();
  }

  state = {
    downloadedL: 0,
    downloaded: 0,
    isLoading: 1,
    visibleDownload: false,
    indeterminate: true,
    visibleDownloadError: false,
    total: 0,
    mbDone: 0,
    bonusSec: 0,
    appState: AppState.currentState
  };

  getAllUsers() {
    return new Promise((resolve, reject) => {
      let dirs = RNFB.fs.dirs;
      const allUsersJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getUsers&languageId=1&projectId=5&token=1234567890';
      const pathToAllUsersJson = dirs.DocumentDir + '/allUsers.json';
      let fetchedUsers;

      userJsonLogic = () => {
        return new Promise((resolve, reject) => {
          fetch(allUsersJsonURL)
            .then(res => res.json())
            .then(res => { fetchedUsers = res; return Promise.resolve(); })
            .then(() => RNFB.fs.exists(pathToAllUsersJson))
            .then(res => !res ? nePostojiUserJson() : postojiUserJson())
            .then(() => resolve())
            .catch(err => console.log('userJsonLogic: ' + err))
        })
      }

      nePostojiUserJson = () => {
        return new Promise((resolve, reject) => {
          RNFB.config({
            path: pathToAllUsersJson
          })
            .fetch('GET', allUsersJsonURL)
            .then(() => { global.allUsers = fetchedUsers; return Promise.resolve() })
            .then(() => resolve())
            .catch(error => console.log('Postoji user json: ' + error))
        })
      }

      postojiUserJson = () => {
        return new Promise((resolve, reject) => {
          RNFB.fs.readFile(pathToAllUsersJson, 'utf8')
            .then(res => {
              global.allUsers = JSON.parse(res);
              if (fetchedUsers.lastChanges == global.allUsers.lastChanges) {
                console.log('lastChanges za Usere su isti');
                return resolve();
              } else {     
                console.log('lastChanges za Usere su razliciti');
                global.allUsers = fetchedUsers;
                RNFB.config({ path: pathToAllUsersJson }).fetch('GET', allUsersJsonURL)
                  .then(() => resolve())
              }
            })
        })
      }

      userJsonLogic()
        .then(() => resolve());
    })
  }

  getUsersFromLocale() {
    let dirs = RNFB.fs.dirs;
    const pathToAllUsersJson = dirs.DocumentDir + '/allUsers.json';
    return new Promise((resolve, reject) => {
      RNFB.fs.readFile(pathToAllUsersJson, 'utf8')
        .then(res => JSON.parse(res))
        .then(res => {
          global.allUsers = res;
          return resolve();
        })
        .catch(error => console.log(error))
    })
  }

  isLoading() {
    const deviceId = DeviceInfo.getUniqueID();
    let dirs = RNFB.fs.dirs;
    let fetchedProject = {};
    let server = '';
    let lastChangesOld = '';
    global.projectJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=5&token=1234567890&deviceId=' + deviceId;

    let fetchedContent = {};
    let contentJsonURLReqParametri; // = '?a=ajax&do=getContent&projectId=5&token=1234567890&deviceId=' + deviceId;
    let contentJsonURL = '';
    let defaultLanguageId;
    let defaultLanguageObject;

    const pathToThumbnails = dirs.DocumentDir + '/videoThumbs/'

    const pathToCheckedFiles = dirs.DocumentDir + '/checkedFiles.json';
    let checkedFiles = { failedDownloads: [], allDownloaded: false };
    let supportedLanguages;


    projectJsonLogic = () => {
      return new Promise((resolve, reject) => {
        fetch(global.projectJsonURL)
          .then(res => res.json())
          .then(res => { fetchedProject = res; return Promise.resolve() })
          .then(() => AsyncStorage.getItem('projectJson'))
          .then(res => res == null ? nePostojiProjectJson() : postojiProjectJson())
          .then(() => initializeCheckedFiles())
          .then(() => { defaultLanguageId = Number(global.projectJson.project.defaultLanguageId); return Promise.resolve(); })
          .then(() => { defaultLanguageObject = global.projectJson.languages.find(l => l.languageId == defaultLanguageId); return Promise.resolve(); })
          .then(() => checkServer())
          .then(res => { console.log(res.config.url); server = res.config.url; return Promise.resolve(); })
          .then(() => { contentJsonURLReqParametri = '?a=ajax&do=getContentByLanguage&languageId=' + defaultLanguageId + '&projectId=5&token=1234567890&deviceId=' + deviceId; return Promise.resolve(); })
          .then(() => { contentJsonURL = server + contentJsonURLReqParametri; return Promise.resolve() })
          .then(() => resolve())
          .catch((err) => reject(err))
      })
    }

    initializeCheckedFiles = () => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem('checkedFiles')
          .then(res => {
            if (res == null) {
              AsyncStorage.setItem('checkedFiles', JSON.stringify(checkedFiles))
                .then(() => resolve())
            } else {
              return resolve();
            }
          })
      })
    }

    nePostojiProjectJson = () => {
      console.log('nePostojiProjectJson()');
      return new Promise((resolve, reject) => {
        AsyncStorage.setItem('projectJson', JSON.stringify(fetchedProject))
          .then(res => { global.projectJson = fetchedProject; return Promise.resolve() })
          .then(() => resolve())
          .catch((err) => reject(err));
      })
    }

    postojiProjectJson = () => {
      console.log('postojiProjectJson()');
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem('projectJson')
          .then(res => {
            const projectJsonObj = JSON.parse(res);
            lastChangesOld = projectJsonObj.project.lastChanges;
            if (hash(fetchedProject) == hash(projectJsonObj)) {
              console.log('hashevi projectJsona su isti!');
              global.projectJson = projectJsonObj;
              return resolve();
            } else {
              // ovde obrisi check files
              console.log('hashevi projectJsona su razliciti!');
              global.projectJson = fetchedProject;
              AsyncStorage.removeItem('checkedFiles')
                .then(() => AsyncStorage.setItem('projectJson', JSON.stringify(fetchedProject)))
                .then(() => resolve());
            }
          })
      })
    }

    checkServer = () => {
      let a = global.projectJson.project.servers.map(server =>
        axios.get(server)
      );
      return Promise.resolve(a[0]);
    }

    supportedLanguagesFile = () => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem('supportedLanguages')
          .then((res) => JSON.parse(res))
          .then((res) => {
            if (res == null) {
              supportedLanguages = { currentlySupportedLanguages: [] };
              supportedLanguages.currentlySupportedLanguages.push(defaultLanguageObject);

            } else {
              supportedLanguages = res;
              supportedLanguages.currentlySupportedLanguages.push(defaultLanguageObject);
              supportedLanguages.currentlySupportedLanguages = _.uniqBy(supportedLanguages.currentlySupportedLanguages, 'languageId');
            }
            return Promise.resolve();
          })
          .then(() => JSON.stringify(supportedLanguages))
          .then((res) => AsyncStorage.setItem('supportedLanguages', res))
          .then(() => resolve())
      })
    }


    setSupportedLanguage = () => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem('supportedLanguages')
          .then((res) => JSON.parse(res))
          .then((res) => {
            let a = global.projectJson.languages.map(l => checkContentForLang(l))
            Promise.all(a)
              .then(() => resolve())
          })
          .catch(() => resolve('Neka greska kod setSupportedLang'));
      })
    }

    checkContentForLang = (lang) => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem(lang.language)
          .then(res => JSON.parse(res))
          .then(res => res == null ? Promise.resolve({ bool: false, res: res }) : Promise.resolve({ bool: true, res: res }))
          .then(res => {
            if (res.bool) { // ako postoji json za jezik
              console.log('Postoji content za ' + lang.language);
              let urlZaJezik = server + '?a=ajax&do=getContentByLanguage&languageId=' + lang.languageId + '&projectId=5&token=1234567890&deviceId=' + deviceId;
              let localLastChanges = res.res.lastChanges;
              fetch(urlZaJezik)
                .then(res => res.json())
                .then(res => {
                  if (res.lastChanges == localLastChanges) {
                    console.log('Content JSON za jezik ' + lang.language + ' je isti kao i u lokalu i ne treba ga menjati.');
                    return resolve();
                  } else {
                    console.log('Content JSON za jezik ' + lang.language + ' je RAZLICITI i treba ga opet skinuti, smestiti i naci fajlove.');
                    AsyncStorage.setItem(lang.language, JSON.stringify(res))
                      .then(() => resolve())
                  }
                })

            } else { // ako ne postoji json za jezik
              console.log('Ne postoji contentJSON za jezik ' + lang.language + ' i treba proveriti da li se treba skinuti');
              AsyncStorage.getItem('supportedLanguages')
                .then((supp) => JSON.parse(supp))
                .then((supp) => {
                  let urlZaJezik = server + '?a=ajax&do=getContentByLanguage&languageId=' + lang.languageId + '&projectId=5&token=1234567890&deviceId=' + deviceId;

                  let ind = supp.currentlySupportedLanguages.findIndex(l => l.languageId == lang.languageId);

                  if (ind >= 0) {
                    console.log('Content JSON za jezik ' + lang.language + ' se treba skinuti.')
                    fetch(urlZaJezik)
                      .then(res => res.json())
                      .then(res => AsyncStorage.setItem(lang.language, JSON.stringify(res)))
                      .then(() => AsyncStorage.getItem('checkedFiles'))
                      .then(res => JSON.parse(res))
                      .then(res => { res && res.allDownloaded ? res.allDownloaded = false : null; return Promise.resolve(res); })
                      .then((res) => AsyncStorage.setItem('checkedFiles', JSON.stringify(res)))
                      .then(() => resolve())

                  } else {
                    console.log('Jezik ' + lang.language + ' se ne treba skinuti');
                    return resolve();
                  }

                })
            }
          })
          .catch((err) => console.log('Neka greska za jezik ' + lang.language + '.\n ' + err))
      })
    }


    checkForFile = () => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem('checkedFiles')
          .then(res => {
            if (res == null) {
              return resolve([]);
            } else {
              res = JSON.parse(res);
              checkedFiles = res;
              if (res.failedDownloads.length > 0) {

                return resolve(res.failedDownloads);
              } else if (res.allDownloaded) {
                return reject('Postoji checkedFiles.')
              } else {
                return resolve([]);
              }
            }
          })
      })
    }

    contentJsonLogic = () => {
      return new Promise((resolve, reject) => {
        supportedLanguagesFile()
          .then(() => setSupportedLanguage())
          .then(() => AsyncStorage.getItem(defaultLanguageObject.language))
          .then((res) => JSON.parse(res))
          .then((res) => { console.log('Defaultni jezik podesen na ' + defaultLanguageObject.language); global.globalJson = res; return Promise.resolve() })
          .then(() => getPdfJson())
          .then(() => getVideoJson())
          .then(() => resolve())
          .catch((err) => reject(err))
      })
    }


    // SREDI ZA OFFLINE

    getPdfJson = () => {
      return new Promise((resolve, reject) => {
        fetch('http://www.cduppy.com/salescms/?a=ajax&do=getDocuments&projectId=5&token=1234567890')
          .then(res => res.json())
          .then(data => { global.globalPdf = data; return Promise.resolve() })
          .then(() => resolve())
          .catch((err) => reject(err))
      })
    }

    getVideoJson = () => {
      return new Promise((resolve, reject) => {
        fetch('http://www.cduppy.com/salescms/?a=ajax&do=getVideos&projectId=5&token=1234567890')
          .then(res => res.json())
          .then(data => { global.globalVideoJson = data; return Promise.resolve() })
          .then(() => RNFB.fs.exists(pathToThumbnails))
          .then(res => !res ? nePostojeThumbsi() : postojeThumbails())
          .then(() => resolve())
          .catch(err => console.log(err))
      })
    }

    postojeThumbails = () => {
      return new Promise((resolve, reject) => {
        let a = global.globalVideoJson.videos.map(video =>
          RNFB.fs.exists(pathToThumbnails + video.thumbnail)
            .then(res => {
              if (!res) {
                RNFB.config({ path: pathToThumbnails + video.thumbnail }).fetch('GET', server + video.thumbnail)
                  .then(() => { console.log('Ovaj thumbnail ne postoji potreban je ponovni download: ' + video.thumbnail); return Promise.resolve() })
              }
            })
        )
        Promise.all(a)
          .then(() => resolve())
          .catch(err => { console.log(err); return reject() })
      })
    }

    nePostojeThumbsi = () => {
      return new Promise((resolve, reject) => {
        let dl = global.globalVideoJson.videos.map(video =>
          RNFB.config({ path: pathToThumbnails + video.thumbnail }).fetch('GET', server + video.thumbnail)
            .then(r => console.log('One thumb downloaded to: ' + r.path()))
        )
        Promise.all(dl)
          .then(() => resolve())
          .catch(err => console.log(err))
      })
    }


    downloadOne = (file) => {
      return new Promise((resolve, reject) => {
        let t0 = Date.now();
        RNFB.config({ path: dirs.DocumentDir + '/' + file.fileId + '.' + file.ext }).fetch('GET', server + global.projectJson.project.contentDir + file.filename + '?deviceId=' + deviceId)
          .then(r => {
            if (r.info().status == 200) {
              console.log('One file downloaded at ', r.path() + ', with status code: ' + r.info().status);
              let t1 = Date.now();
              this.setState(prevState => ({ downloaded: prevState.downloaded + 1, mbDone: Math.trunc((prevState.mbDone + Math.round(Number(file.size) / 1024 / 1024 * 100)/100)*100)/100 }));
              let time = t1 - t0;
              let sizeOne = Number(file.size) / 1024.0;
              let dlSpeed = sizeOne / time;
              global.averageSpeed = 0.001 * dlSpeed + (1 - 0.001) * global.averageSpeed;
              this.setState(() => ({ bonusSec: ((this.state.total - this.state.mbDone) / global.averageSpeed).toFixed(0) }));
              return resolve();
            } else if (r.info().status == 404) {
              console.log('Fajl ne postoji: ' + file.fileId);
              checkedFiles.failedDownloads.push(file);
              AsyncStorage.setItem('checkedFiles', JSON.stringify(checkedFiles));
              RNFB.fs.unlink(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext);
              return resolve();
            } else {
              console.log('Neka druga greska');
              checkedFiles.failedDownloads.push(file);
              AsyncStorage.setItem('checkedFiles', JSON.stringify(checkedFiles));
              RNFB.fs.unlink(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext);
              return resolve();
            }

          })
          .catch((err) => {
            console.log('Fajl koruptovan: ' + file.fileId);
            checkedFiles.failedDownloads.push(file);
            AsyncStorage.setItem('checkedFiles', JSON.stringify(checkedFiles));
            RNFB.fs.unlink(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext);
            return resolve()
          })
      })
    }

    calculateSize = (filesArr) => {
      return new Promise((resolve, reject) => {
        let result = 0;
        if (filesArr.length <= 0) {
          reject('Array is empty')
        } else {
          filesArr.forEach(element => {
            result += Number(element.size);
          });
          result = (result / 1024 / 1024).toFixed(2);
          this.setState({ visibleDownload: true, total: result });
          return resolve(result);
        }
      })
    }

    alertForDownload = (mb, niz) => {
      return new Promise((resolve, reject) => {
        if (!mb) {
          reject();
        }
        NetInfo.getConnectionInfo()
          .then((res) => {
            const speedBenchmarkFile = server + projectJson.project.speedBenchmarkFile;
            const pathToSpeedBenchmarkFile = dirs.DocumentDir + '/benchmark666.jpg';
            const timeBeforeDownload = Date.now();
            RNFB.config({ path: pathToSpeedBenchmarkFile }).fetch('GET', speedBenchmarkFile)
              .then((benchmarkFile) => {
                const timeAfterDownload = Date.now();
                const benchmarkTime = timeAfterDownload - timeBeforeDownload;
                RNFB.fs.readFile(benchmarkFile.path(), 'base64')
                  .then(data => {
                    const decodedData = base64.decode(data);
                    const Bytes = decodedData.length;
                    const Bits = Bytes * 8;
                    const KBitsPerSecond = Bits / benchmarkTime;
                    const MBitsPerSecond = KBitsPerSecond / 1024;

                    let cellularType = res.effectiveType;
                    let warningString = res.type == 'cellular' ? 'Warning, you are on cellular ' + cellularType + ' network, this download could be charged.' : '';
                    let downloadSpeed = MBitsPerSecond;
                    global.averageSpeed = downloadSpeed;
                    let est = downloadSpeed != 0 ? (mb / downloadSpeed / 60).toFixed(0) + ' minutes ' + ((mb / downloadSpeed).toFixed(0) % 60) + ' seconds' : 'inf.';
                    Alert.alert(
                      'About to download ' + mb + ' MB',
                      '' + warningString + '\n' + 'Estimated time: ' + est + '.\nDo you wish to download?',

                      [
                        { text: 'OK', onPress: () => { this.setTimerClick((mb / downloadSpeed).toFixed(0)); return resolve() } },
                        {
                          text: 'Skip',
                          onPress: () => {
                            checkedFiles.allDownloaded = false;
                            checkedFiles.failedDownloads = niz;
                            AsyncStorage.setItem('checkedFiles', JSON.stringify(checkedFiles));
                            return reject('Pritisnut reject');
                          }
                        }
                      ], { cancelable: false }

                    )

                  })
              })
              .catch(error => {
                let cellularType = res.effectiveType;
                let warningString = res.type == 'cellular' ? 'Warning, you are on cellular ' + cellularType + ' network, this download could be charged.' : '';
                let downloadSpeed = 0;
                if (res.type == 'cellular')
                  switch (res.effectiveType) {
                    case '2g':
                      downloadSpeed = 0.04 / 8.0;
                      break;
                    case '3g':
                      downloadSpeed = 6.04 / 8.0;
                      break;
                    case '4g':
                      downloadSpeed = 18.4 / 8.0;
                      break;
                  }
                if (res.type == 'wifi')
                  downloadSpeed = 23.5 / 8.0;
                global.averageSpeed = downloadSpeed;
                let est = downloadSpeed != 0 ? (mb / downloadSpeed / 60).toFixed(0) + ' minutes ' + ((mb / downloadSpeed).toFixed(0) % 60) + ' seconds' : 'inf.';
                Alert.alert(
                  'About to download ' + mb + ' MB',
                  '' + warningString + '\n' + 'Estimated time: ' + est + '.\nDo you wish to download?',
                  [
                    { text: 'OK', onPress: () => { this.setTimerClick((mb / downloadSpeed).toFixed(0)); return resolve() } },
                    { text: 'Skip', onPress: () => reject() }]
                )
              });
          })
      })
    }



    checkHashFiles = (pocetni) => {
      console.log('usao u hash files()');
      return new Promise((resolve, reject) => {
        let downloadStage = pocetni;
        checkedFiles.failedDownloads = [];
        AsyncStorage.getItem('supportedLanguages')
          .then(res => JSON.parse(res))
          .then(res => {
            let a = res.currentlySupportedLanguages.map(l => {
              return new Promise((resolve, reject) => {
                AsyncStorage.getItem(l.language)
                  .then(res => JSON.parse(res))
                  .then(res => {
                    let b = res.files.map(file =>
                      RNFB.fs.exists(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext)
                        .then(res => {
                          if (!res) { /* && md5(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext)  != file.hash*/
                            downloadStage.push(file);
                          }
                        })
                    )
                    Promise.all(b)
                      .then(() => resolve())
                  })
              })
            })
            Promise.all(a)
              .then(() => { downloadStage = _.uniqBy(downloadStage, 'fileId'); return Promise.resolve(); })
              .then(() => resolve(downloadStage))
              .catch(err => console.log('Greska kod checkHashFiles()' + err))

          })

      })
    }

    processArray = (array, fn) => {
      var index = 0;
      return new Promise((resolve, reject) => {
        function next() {
          if (index < array.length) {
            fn(array[index++]).then(next, reject);
          } else {
            resolve();
          }
        }
        next();
      })
    }


    downloadFiles = (filesArr) => {
      console.log('usao u downloadFiles()')
      return new Promise((resolve, reject) => {
        /*let b = prepareFilesArrayIntoChunks(filesArr, 1);
        let a = b.map(chunk =>
          chunkDownload(chunk)
            .then(() => console.log('zavrsio 5'))
        );*/
        /*let a = filesArr.map(file =>
          downloadOne(file)
        );*/
        this.setState({ downloadedL: filesArr.length });
        //Promise.all(a)
        processArray(filesArr, downloadOne)
          .then(() => console.log('All downloads finished!'))
          .then(() => checkedFiles.allDownloaded = true)
          .then(() => AsyncStorage.setItem('checkedFiles', JSON.stringify(checkedFiles)))
          .then(() => resolve())
          .catch(err => console.log('Greska kod downloadFIles(): ' + err))


      })
    }

    akoImaNeta = () => {
      projectJsonLogic()
        .then(() => contentJsonLogic())
        .then(() => this.getAllUsers())
        .then(() => checkForFile())
        //.then(() => Promise.resolve([]))
        .then((a) => checkHashFiles(a))
        .then((niz) => calculateSize(niz)
          .then((mb) => alertForDownload(mb, niz))
          .then(() => downloadFiles(niz))
        )
        .catch(err => console.log('Catch od glavnog bloka od checkHashFiles: ' + err))
        .then(() => this.setState({ isLoading: 0 }))
    }

    zaNemaNetaDefault = () => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem('projectJson')
          .then(res => res != null ? res : Promise.reject('Ne postoji project JSON u lokalu'))
          .then(res => JSON.parse(res))
          .then(res => {
            global.projectJson = res;
            defaultLanguageId = Number(global.projectJson.project.defaultLanguageId);
            defaultLanguageObject = global.projectJson.languages.find(l => l.languageId == defaultLanguageId);
            return Promise.resolve();
          })
          .then(() => resolve())
          .catch(err => reject(err));

      })

    }

    akoNemaNeta = () => {
      zaNemaNetaDefault()
        .then(() => AsyncStorage.getItem(defaultLanguageObject.language))
        .then((res) => res == null ? Promise.resolve({ bool: false, res: res }) : Promise.resolve({ bool: true, res: res }))
        .then(res => {
          if (!res.bool) {
            this.setState({ isLoading: -1 })
          } else {
            global.globalJson = JSON.parse(res.res);
            this.setState({ isLoading: 0 });
          }
        })
        .then(() => this.getUsersFromLocale())
        .catch((err) => { console.log(err); this.setState({ isLoading: -1 }) })
    }



    this.isNetworkConnected()
      .then(res => {
        if (res) {
          akoImaNeta();
        } else {
          akoNemaNeta();
        }
      })



  }// End of isLoading()

  isNetworkConnected = global.isNetworkConnected = () => {
    if (Platform.OS === 'ios') {
      return new Promise(resolve => {
        const handleFirstConnectivityChangeIOS = isConnected => {
          NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS);
          resolve(isConnected);
        };
        NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
      });
    }
    return NetInfo.isConnected.fetch();
  }


  syncApp() {
    this.isNetworkConnected()
      .then(res => {
        if (res) {
          AsyncStorage.getItem('checkedFiles')
            .then((res) => JSON.parse(res))
            .then(fajlic => {
              fetch(global.projectJsonURL)
                .then(res => res.json())
                .then(res => {
                  let neSkinutiFajlovi = fajlic.failedDownloads.length > 0 ? 'There seems to be ' + fajlic.failedDownloads.length + ' missing files. Try syncing the app. \nIf this problem persists, that means files are missing from the server. \nContact your admin to fix it.' : 'Seems everything is OK. If you want you can restart application anyway.';
                  if (res.project.lastChanges == global.projectJson.project.lastChanges) {
                    //Alert.alert('UP TO DATE!', neSkinutiFajlovi, [{ text: 'Sync', onPress: () => { RNRestart.Restart(); } }, { text: 'Cancel', onPress: () => { } }])
                  } else {
                    Alert.alert('There seems to be update!', 'Do you wish to sync?', [{ text: 'Sync', onPress: () => { RNRestart.Restart(); } }, { text: 'Cancel', onPress: () => { } }]);
                  }
                })
                .catch(() => { /*Alert.alert('Error', 'Something went wrong. Please check your internet connection, restart the app, or try again later.', [{ text: 'OK', onPress: () => { } }]);*/ });
            })
        } else {
          //Alert.alert('Offline', 'You seem to be offline.', [{ text: 'OK', onPress: () => {} }]);
        }
      })
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      this.syncApp();
    }
    this.setState({ appState: nextAppState });
  }

  componentWillMount() {
    KeepAwake.activate();
    this.isLoading();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  calcProgress() {
    if (this.state.downloaded == 1) {
      this.state.indeterminate = false;
    }
    if (this.state.downloaded > 0) {
      return this.state.downloaded / this.state.downloadedL;
    }
  }

  setTimerClick = (secondsLeft) => {
    this.setState(() => ({ bonusSec: secondsLeft }));
    let interval = setInterval(() => {
      if (this.state.isLoading == 0) {
        clearInterval(interval);
      }
      this.setState((oldState) => ({ bonusSec: oldState.bonusSec - 1 }));
    }, 1000);
  }


  render() {
    if (this.state.isLoading == 0) {
      return (
        <View style={styles.container}>
          <Routes />
        </View>
      );

    } else if (this.state.isLoading == 1) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%", backgroundColor: '#fff' }}>
          <Image style={{ width: 64, height: 64, marginTop: 50 }} source={require('./src/components/ico/x64/magna.png')} />

          <StatusBar barStyle="dark-content" hidden={true} />
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#fff' }}>
            <Text style={styles.loadTextF}>Loading, please wait...</Text>
            {this.state.visibleDownloadError && <Text style={styles.loadText}>There seems to be corrupted download. {'\n'}Please restart the application if you see the bar below stuck.</Text>}
            {this.state.visibleDownload && <Text style={styles.loadText}>Downloaded {this.state.downloaded} of {this.state.downloadedL} files.</Text>}
            {this.state.visibleDownload && <Text style={styles.loadText}>Downloaded {this.state.mbDone} MB of {this.state.total} MB.</Text>}
            {this.state.visibleDownload &&
              <Text style={styles.loadText}
              >
                Remaining time: {global.averageSpeed &&
                  (this.state.bonusSec >= 60 ?
                    (((this.state.total - this.state.mbDone) / global.averageSpeed) / 60).toFixed(0) + ' min' :
                    (this.state.bonusSec <= 0 ? 'almost done...' : (this.state.bonusSec + ' seconds'))
                  )}
              </Text>}

          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }} >
            <Progress.Bar
              style={{ margin: 10, opacity: this.state.showProgress }}
              indeterminate={this.state.indeterminate}
              progress={this.calcProgress()}
              color='#9E9E9E'
            />


          </View>
        </View >
      );
    }
    else if (this.state.isLoading == -1) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%", backgroundColor: '#fff' }}>
          <StatusBar barStyle="dark-content" hidden={true} />
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Text style={styles.loadText}>You are starting app for first time and you are offline.</Text>
            <Text style={styles.loadText}>We need to show some content, and for this we need to download it.</Text>
            <Text style={styles.loadText}>Please connect to internet first.</Text>
          </View>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  loadText: {

    color: '#9E9E9E',
    fontSize: 30,
    paddingTop: 20
  },
  loadTextF: {
    alignSelf: 'center',
    color: '#9E9E9E',
    fontSize: 30,
    paddingBottom: 20
  }
});