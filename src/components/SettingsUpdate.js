import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNRestart from 'react-native-restart';
import RNFB from 'react-native-fetch-blob';
import { syncApp } from '../../helpers';

export default class SettingsUpdate extends Component {

    reDownload = () => {
        Alert.alert('RE-DOWNLOAD', 'This action will delete and redownload all files. Are you sure you want to continue?', [{ text: 'Yes', onPress: () => this.redownlodAllFiles() }, { text: 'No', onPress: () => { } }]);
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

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: '40%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column', width: '80%' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 40, fontWeight: '700', color: '#757575' }}>UPDATES</Text>
                </View>
                <View style={styles.download}>
                    <TouchableOpacity style={styles.buttonLog} onPress={() => syncApp(true)}>
                        <Text style={styles.buttonText}>DOWNLOAD UPDATES</Text>
                    </TouchableOpacity>
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