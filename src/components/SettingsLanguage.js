import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Switch, Alert } from 'react-native';
import _ from 'lodash';
import RNRestart from 'react-native-restart';


export default class SettingsLanguage extends Component {

    state = {
        allLanguages: [],
        buttonDisabled: false
    };

    renderCheckBoxes = () => {
        return this.state.allLanguages.map((l, i) => {
            return (
                <View key={i} style={{ backgroundColor: 'white', padding: 15 }}>
                    <Text>{l.language}</Text>
                    <Switch
                        onValueChange={() => this.onLangCheckClick(l)}
                        value={l.selected}
                        disabled={l.disabled}
                    />
                </View>
            );
        })
    }

    onLangCheckClick = (lang) => {
        const noviAllLang = this.state.allLanguages.map(l => {
            if (lang.languageId == l.languageId) {
                l.selected = !l.selected;
            }
            return l;
        })

        this.setState({ allLanguages: noviAllLang })
    }

    onLangSubmit = () => {
        AsyncStorage.getItem('supportedLanguages')
            .then(res => JSON.parse(res))
            .then(res => {
                //let newLang = res.currentlySupportedLanguages;

                this.state.allLanguages.map(l => {
                    let i = global.projectJson.languages.find(i => i.languageId == l.languageId)
                    if (i && l.selected) {

                        res.currentlySupportedLanguages.push(i);
                    }
                })
                res.currentlySupportedLanguages = _.uniqBy(res.currentlySupportedLanguages, 'languageId');
                return Promise.resolve(res);
            })
            .then(res => AsyncStorage.setItem('supportedLanguages', JSON.stringify(res)))
            .then(() => Alert.alert('Update', 'About to download new content for selected languages. Do you wish to continue', [{ text: 'Sync', onPress: () => { RNRestart.Restart(); } }, { text: 'Cancel', onPress: () => { } }]))
            .catch(err => console.log(err))
    }

    componentWillMount() {
        let lang = [];
        AsyncStorage.getItem('supportedLanguages')
            .then(res => JSON.parse(res))
            .then(res => {
                lang = global.projectJson.languages.map(l => {
                    let i = res.currentlySupportedLanguages.find(i => l.languageId == i.languageId);
                    if (i) {
                        i.selected = true;
                        i.disabled = true;
                        return i;
                    } else {
                        return { ...l, selected: false, disabled: false }
                    }
                })
                return Promise.resolve();
            })
            .then(() => {
                this.setState({ allLanguages: lang });
                return Promise.resolve();
            })
            .then(() => {
                a = this.state.allLanguages.map(l => {
                    if(l.selected) {
                       return Promise.resolve();
                    } else {
                        return Promise.reject();
                    }
                })
                Promise.all(a)
                .then(() => this.setState({buttonDisabled: true}))
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Languages</Text>
                </View>
                <View style={styles.languages}>
                    {this.renderCheckBoxes()}
                </View>
                <View style={styles.submitBtnCont}>
                    <TouchableOpacity disabled={this.state.buttonDisabled} style={styles.submitBtn} onPress={() => this.onLangSubmit()}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
    },
    title: {
        fontSize: 48,
        fontWeight: '700',
        color: 'black'
    },
    titleContainer:{
        height: '20%'
    },
    languages:{
        height: '30%',
        flexDirection: 'row',
    },
    submitBtnCont: {
        height: '50%',
        width: '25%'
    },
    submitBtn:{
        padding: 10, 
        backgroundColor: '#d8d8d8', 
        width: '100%'
    }
});
