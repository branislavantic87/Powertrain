import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNRestart from 'react-native-restart';
import RNFB from 'react-native-fetch-blob'

export default class SettingsUpdate extends Component {

    state = {
        isLoading: false
    };

    reDownload = () => {
        Alert.alert('RE-DOWNLOAD', 'This action will delete and redownload all files. Are you sure you want to continue?', [{ text: 'Yes', onPress: () => this.redownlodAllFiles() }, { text: 'No', onPress: () => { } }]);
    }

    syncApp() {
        this.setState({ isLoading: true });
        global.isNetworkConnected()
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
                                        Alert.alert('UP TO DATE!', neSkinutiFajlovi, [{ text: 'Sync', onPress: () => { RNRestart.Restart(); } }, { text: 'Cancel', onPress: () => { } }])
                                    } else {
                                        Alert.alert('There seems to be update!', 'Do you wish to sync?', [{ text: 'Sync', onPress: () => { RNRestart.Restart(); } }, { text: 'Cancel', onPress: () => { } }]);
                                    }
                                })
                                .then(() => Promise.resolve())
                                .catch(() => { Alert.alert('Error', 'Something went wrong. Please check your internet connection, restart the app, or try again later.', [{ text: 'OK', onPress: () => { } }]); });
                        })
                        .then(() => this.setState({ isLoading: false }))
                } else {
                    Alert.alert('Offline', 'You seem to be offline.', [{ text: 'OK', onPress: () => { } }]);
                    this.setState({ isLoading: false });
                }
            })
            .catch((err) => { console.log(err); this.setState({ isLoading: false }) })
    }

    redownlodAllFiles = () => {
        RNFB.fs.ls(RNFB.fs.dirs.DocumentDir)
            .then((res) => res.map(file => file.substring(file.length - 2, file.length) != 'js' ? file : null))
            .then(res => {
                console.log(res);
                return new Promise((resolve, reject) => {
                    let a = res.map(f => RNFB.fs.unlink(RNFB.fs.dirs.DocumentDir + '/' + f));
                    Promise.all(a)
                        .then(() => resolve())
                })
            })
            //.then(() => RNFB.fs.unlink(RNFB.fs.dirs.DocumentDir))
            .then(() => AsyncStorage.getAllKeys())
            .then(res => AsyncStorage.multiRemove(res))
            .then(() => RNRestart.Restart())
            .catch(err => console.log(err))
    }

    buttonOrActivity = () => {
        if (this.state.isLoading) {
            return <ActivityIndicator size={'large'} />
        }
        return (
            <TouchableOpacity style={styles.buttonLog} onPress={() => this.syncApp()}>
                <Text style={styles.buttonText}>DOWNLOAD UPDATES</Text>
            </TouchableOpacity>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: '40%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column', width: '80%' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 40, fontWeight: '700', color: 'black' }}>UPDATES</Text>
                </View>
                <View style={styles.download}>
                    {this.buttonOrActivity()}
                    <TouchableOpacity style={styles.buttonReg} onPress={() => this.reDownload()}>
                        <Text style={styles.buttonText}>RE-DOWNLOAD</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '14%'
    },
    download: {
        height: '60%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        paddingTop: '4%'
    },
    buttonText: {
        fontSize: 28,
        fontWeight: '100',
        textAlign: 'center',
    },
    buttonLog: {
        backgroundColor: '#d8d8d8',
        width: '70%',
        height: '27%',
        justifyContent: 'center',
        marginBottom: 30,
        padding: 10
    },
    buttonReg: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#d8d8d8',
        width: '70%',
        height: '27%',
        justifyContent: 'center',
        padding: 5
    },
    skip: {
        width: '100%'
    }
});