import React, { Component } from 'react';
import { Platform, NetInfo, AsyncStorage, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFB from 'react-native-fetch-blob';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import _ from 'lodash';

const dirs = RNFB.fs.dirs;
const deviceId = DeviceInfo.getUniqueID();
let fetchedJson = {};
let supportedLanguages = {};
let defaultLanguageId = 1;
let defaultLanguageObject = {};
let server = '';

urls = global.urls = {
    projectJson: 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=5&token=1234567890&deviceId=' + deviceId,
    usersJson: 'http://www.cduppy.com/salescms/?a=ajax&do=getUsers&projectId=5&token=1234567890&deviceId=' + deviceId,
    pdfJson: 'http://www.cduppy.com/salescms/?a=ajax&do=getDocuments&projectId=5&token=1234567890&deviceId=' + deviceId,
    videosJson: 'http://www.cduppy.com/salescms/?a=ajax&do=getVideos&projectId=5&token=1234567890&deviceId=' + deviceId
};


export const jsonLogic = (json) => {
    return new Promise((resolve, reject) => {
        fetch(urls[json])
            .then(res => res.json())
            .then(res => { fetchedJson[json] = res; return Promise.resolve() })
            .then(res => AsyncStorage.getItem(json))
            .then(res => res == null ? nePostojiJson(json) : postojiJson(json))
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

nePostojiJson = (json) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(json, JSON.stringify(fetchedJson[json]))
            .then(() => { global[json] = fetchedJson[json]; return Promise.resolve(); })
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

postojiJson = (json) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(json)
            .then(res => {
                global[json] = JSON.parse(res);
                if (global[json].lastChanges == fetchedJson[json].lastChanges) {
                    return resolve();
                } else {
                    global[json] = fetchedJson[json];
                    AsyncStorage.setItem(json, JSON.stringify(fetchedJson[json]))
                        .then(() => resolve())
                }
            })
    })
}

export const contentJsonLogic = () => {
    return new Promise((resolve, reject) => {
        initializeLanguagesFile()
            .then(() => setSupportedLanguage())
            .then(() => AsyncStorage.getItem(defaultLanguageObject.language))
            .then((res) => JSON.parse(res))
            .then((res) => { console.log('Defaultni jezik podesen na ' + defaultLanguageObject.language); global.globalJson = res; return Promise.resolve() })
            .then(() => resolve())
            .catch((err) => reject(err))
    })
}

initializeLanguagesFile = () => {
    return new Promise((resolve, reject) => {
        defaultLanguageId = Number(global.projectJson.project.defaultLanguageId);
        defaultLanguageObject = global.projectJson.languages.find(l => l.languageId == defaultLanguageId);
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
                    let urlZaJezik = global.server + '?a=ajax&do=getContentByLanguage&languageId=' + lang.languageId + '&projectId=5&token=1234567890&deviceId=' + deviceId;
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
                            let urlZaJezik = global.server + '?a=ajax&do=getContentByLanguage&languageId=' + lang.languageId + '&projectId=5&token=1234567890&deviceId=' + deviceId;

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

export const checkForFile = () => {
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

export const checkHashFiles = (pocetni) => {
    console.log('usao u hash files()');
    return new Promise((resolve, reject) => {
        let downloadStage = pocetni;
        //checkedFiles.failedDownloads = [];
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

export const zaNemaNetaDefault = () => {
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

export const initializeCheckedFiles = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('checkedFiles')
            .then(res => {
                if (res == null) {
                    AsyncStorage.setItem('checkedFiles', JSON.stringify({ failedDownloads: [], allDownloaded: false }))
                        .then(() => resolve())
                } else {
                    return resolve();
                }
            })
    })
}

export const checkServer = () => {
    let a = global.projectJson.project.servers.map(server =>
        axios.get(server)
    );
    return Promise.resolve(a[0]);
}

export const thumbnailsLogic = () => {
    return new Promise((resolve, reject) => {
        RNFB.fs.exists(RNFB.fs.dirs.DocumentDir + '/videoThumbs/')
            .then(res => !res ? nePostojeThumbsi() : postojeThumbsi())
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

nePostojeThumbsi = () => {
    return new Promise((resolve, reject) => {
        let dl = global.videosJson.videos.map(video =>
            RNFB.config({ path: dirs.DocumentDir + '/videoThumbs/' + video.thumbnail }).fetch('GET', global.server + video.thumbnail)
                .then(r => console.log('One thumb downloaded to: ' + r.path()))
        )
        Promise.all(dl)
            .then(() => resolve())
            .catch(err => console.log(err))
    })
}

postojeThumbsi = () => {
    return new Promise((resolve, reject) => {
        let a = global.videosJson.videos.map(video =>
            RNFB.fs.exists(dirs.DocumentDir + '/videoThumbs/' + video.thumbnail)
                .then(res => {
                    if (!res) {
                        RNFB.config({ path: dirs.DocumentDir + '/videoThumbs/' + video.thumbnail }).fetch('GET', global.server + video.thumbnail)
                            .then(() => { console.log('Ovaj thumbnail ne postoji potreban je ponovni download: ' + video.thumbnail); return Promise.resolve() })
                    }
                })
        )
        Promise.all(a)
            .then(() => resolve())
            .catch(err => { console.log(err); return reject() })
    })
}

export const isNetworkConnected = () => {
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

export const syncApp = (showAlerts) => {
    isNetworkConnected()
        .then(res => {
            if (res) {
                AsyncStorage.getItem('checkedFiles')
                    .then((res) => JSON.parse(res))
                    .then(fajlic => {
                        fetch(urls.projectJson)
                            .then(res => res.json())
                            .then(res => {
                                let neSkinutiFajlovi = fajlic.failedDownloads.length > 0 ? 'There seems to be ' + fajlic.failedDownloads.length + ' missing files. Try syncing the app. \nIf this problem persists, that means files are missing from the server. \nContact your admin to fix it.' : 'Seems everything is OK. If you want you can restart application anyway.';
                                if (res.project.lastChanges == global.projectJson.project.lastChanges) {
                                    showAlerts && Alert.alert('UP TO DATE!', neSkinutiFajlovi, [{ text: 'Sync', onPress: () => { RNRestart.Restart(); } }, { text: 'Cancel', onPress: () => { } }])
                                } else {
                                    Alert.alert('There seems to be update!', 'Do you wish to sync?', [{ text: 'Sync', onPress: () => { RNRestart.Restart(); } }, { text: 'Cancel', onPress: () => { } }]);
                                }
                            })
                            .catch(() => { showAlerts && Alert.alert('Error', 'Something went wrong. Please check your internet connection, restart the app, or try again later.', [{ text: 'OK', onPress: () => { } }]); });
                    })
            } else {
                showAlerts && Alert.alert('Offline', 'You seem to be offline.', [{ text: 'OK', onPress: () => { } }]);
            }
        })
}

export const processArrayInSequence = (array, fn) => {
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