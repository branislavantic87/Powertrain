import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, ScrollView, Alert } from 'react-native';
import RNRestart from 'react-native-restart';

export default class SettingsFailedFiles extends Component {

    state = {
        failedFiles: []
    };

    componentWillMount() {
        AsyncStorage.getItem('checkedFiles')
            .then(res => JSON.parse(res))
            .then(res => this.setState({ failedFiles: res.failedDownloads }))
    }

    isThereFailedFiles = () => {
        if (this.state.failedFiles.length == 0) {
            return (
                <View style={styles.content}>

                    <Text style={styles.text}>There seems to be no failed downloads.</Text>

                </View>

            );
        } else {
            return (
                <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
                    <ScrollView contentContainerStyle={styles.contentFailed}>

                        {this.renderFailedFiles()}


                    </ScrollView>
                    <View style={{ borderBottomWidth: 1, borderColor: '#757575' }} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => Alert.alert('Download all files', 'You need to restart application to try and download all failed files. Do you wish to continue?', [{ text: 'Yes', onPress: () => RNRestart.Restart() }, { text: 'No', onPress: () => { } }])}
                            style={styles.buttonDownload}>
                            <Text style={styles.buttonText}>DOWNLOAD ALL FILES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    renderFailedFiles = () => {
        return this.state.failedFiles.map(f => {
            return (
                <View key={f.fileId} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.failedText}>{f.filename}</Text>
                    </View>
                    <View>
                        <Text>{(Number(f.size) / 1024 / 1024).toFixed(2)} MB</Text>
                    </View>
                </View>
            );
        })
    }



    render() {
        return (
            <View>
                {this.isThereFailedFiles()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentFailed: {
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 10
    },
    text: {
        alignSelf: 'center',
        fontSize: 16
    },
    failedText: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginBottom: 10
    },
    buttonContainer: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    buttonDownload: {
        backgroundColor: '#cccccc',
        width: '45%',
        height: '60%',
        justifyContent: 'center',
        marginRight: 20
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18
    }
});