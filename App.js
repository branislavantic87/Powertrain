import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  StatusBar,
  AsyncStorage,
  Image,
  AppState,
  NetInfo
} from 'react-native';
import RNFB from 'react-native-fetch-blob';
import DeviceInfo from 'react-native-device-info';
import * as Progress from 'react-native-progress';
import md5 from 'md5';
import Routes from './src/components/Routes';
import base64 from 'base-64';
import KeepAwake from 'react-native-keep-awake';
import _ from 'lodash';
import {
  isNetworkConnected,
  syncApp,
  jsonLogic,
  thumbnailsLogic,
  initializeCheckedFiles,
  checkServer,
  contentJsonLogic,
  checkForFile,
  checkHashFiles,
  processArrayInSequence,
  zaNemaNetaDefault
} from './helpers';

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


  isLoading() {

    const deviceId = DeviceInfo.getUniqueID();
    let dirs = RNFB.fs.dirs;
    let defaultLanguageId;
    let defaultLanguageObject;
    let checkedFiles = {};


    projectJsonLogic = () => {
      return new Promise((resolve, reject) => {
        jsonLogic('projectJson')
          .then(() => initializeCheckedFiles())
          .then(() => checkServer())
          .then(res => { global.server = res.config.url; return Promise.resolve(); })
          .then(() => resolve())
          .catch((err) => reject(err))
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
            const speedBenchmarkFile = global.server + projectJson.project.speedBenchmarkFile;
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
                            global.checkedFiles.allDownloaded = false;
                            global.checkedFiles.failedDownloads = niz;
                            AsyncStorage.setItem('checkedFiles', JSON.stringify(global.checkedFiles));
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
        processArrayInSequence(filesArr, downloadOne)
          .then(() => console.log('All downloads finished!'))
          .then(() => global.checkedFiles.allDownloaded = true)
          .then(() => AsyncStorage.setItem('checkedFiles', JSON.stringify(global.checkedFiles)))
          .then(() => resolve())
          .catch(err => console.log('Greska kod downloadFIles(): ' + err))


      })
    }

    downloadOne = (file) => {
      return new Promise((resolve, reject) => {
        let t0 = Date.now();
        RNFB.config({ path: dirs.DocumentDir + '/' + file.fileId + '.' + file.ext }).fetch('GET', global.server + global.projectJson.project.contentDir + file.filename + '?deviceId=' + deviceId)
          .then(r => {
            if (r.info().status == 200) {
              console.log('One file downloaded at ', r.path() + ', with status code: ' + r.info().status);
              let t1 = Date.now();
              this.setState(prevState => ({ downloaded: prevState.downloaded + 1, mbDone: prevState.mbDone + Math.round(Number(file.size) / 1024 / 1024) }));
              let time = t1 - t0;
              let sizeOne = Number(file.size) / 1024.0;
              let dlSpeed = sizeOne / time;
              global.averageSpeed = 0.001 * dlSpeed + (1 - 0.001) * global.averageSpeed;
              this.setState(() => ({ bonusSec: ((this.state.total - this.state.mbDone) / global.averageSpeed).toFixed(0) }));
              return resolve();
            } else if (r.info().status == 404) {
              console.log('Fajl ne postoji: ' + file.fileId);
              global.checkedFiles.failedDownloads.push(file);
              AsyncStorage.setItem('checkedFiles', JSON.stringify(global.checkedFiles));
              RNFB.fs.unlink(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext);
              return resolve();
            } else {
              console.log('Neka druga greska');
              global.checkedFiles.failedDownloads.push(file);
              AsyncStorage.setItem('checkedFiles', JSON.stringify(global.checkedFiles));
              RNFB.fs.unlink(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext);
              return resolve();
            }

          })
          .catch((err) => {
            console.log('Fajl koruptovan: ' + file.fileId);
            global.checkedFiles.failedDownloads.push(file);
            AsyncStorage.setItem('checkedFiles', JSON.stringify(global.checkedFiles));
            RNFB.fs.unlink(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext);
            return resolve()
          })
      })
    }

    akoImaNeta = () => {
      projectJsonLogic()
        .then(() => contentJsonLogic())
        .then(() => jsonLogic('usersJson'))
        .then(() => jsonLogic('pdfJson'))
        .then(() => jsonLogic('videosJson'))
        .then(() => thumbnailsLogic())
        .then(() => checkForFile())
        .then((a) => checkHashFiles(a))
        .then((niz) => calculateSize(niz)
          .then((mb) => alertForDownload(mb, niz))
          .then(() => downloadFiles(niz))
        )
        .catch(err => console.log('Catch od glavnog bloka od checkHashFiles: ' + err))
        .then(() => this.setState({ isLoading: 0 }))
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
        .then(() => AsyncStorage.getItem('usersJson'))
        .then(res => global.usersJson = JSON.parse(res))
        .then(() => AsyncStorage.getItem('pdfJson'))
        .then(res => { global.pdfJson = JSON.parse(res); return Promise.resolve() })
        .then(() => AsyncStorage.getItem('videoJson'))
        .then(res => { global.videosJson = JSON.parse(res); return Promise.resolve(); })
        .catch((err) => { console.log(err); this.setState({ isLoading: -1 }) })
    }

    isNetworkConnected()
      .then(res => {
        if (res) {
          akoImaNeta();
        } else {
          akoNemaNeta();
        }
      })

  } // End of isLoading()



  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      syncApp(false);
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