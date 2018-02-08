import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';

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
                <View style={{width: '100%', height: '100%', flexDirection:'column'}}>
                <ScrollView contentContainerStyle={styles.contentFailed}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.failedText}>There seems to be no failed downloads.</Text>
                        </View>
                        <View>
                            <Text>15MB</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.failedText}>There seems to be no failed downloads.</Text>
                        </View>
                        <View>
                            <Text>15MB</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.failedText}>There seems to be no failed downloads.</Text>
                        </View>
                        <View>
                            <Text>15MB</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.failedText}>There seems to be no failed downloads.</Text>
                        </View>
                        <View>
                            <Text>15MB</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.failedText}>There seems to be no failed downloads.</Text>
                        </View>
                        <View>
                            <Text>15MB</Text>
                        </View>
                    </View>
                    
                </ScrollView>
                <View style={{borderBottomWidth: 3, borderColor: '#757575' }}/>
           
                </View>
            );
        } else {
            return (
                <View style={styles.contentFailed}>
                    {this.renderFailedFiles()}
                </View>
            );
        }
    }

    renderFailedFiles = () => {
        return this.state.failedFiles.map(f => {
            return <Text style={styles.failedText} key={f.fileId}>{f.filename}</Text>
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
    }
});