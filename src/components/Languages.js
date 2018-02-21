import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';


class Languages extends Component {

    state = {
        supportedLanguages: []
    };

    componentWillMount() {
        AsyncStorage.getItem('supportedLanguages')
        .then((res) => JSON.parse(res))
        .then(res => this.setState({supportedLanguages: res.currentlySupportedLanguages}))
    }

    isDisabled = (lang) => {
        if(this.state.supportedLanguages.findIndex(l => l.languageId == lang.languageId) < 0) {
            return true;
        } else {
            return false;
        }
    }


    onclickLanguageText = (lang) => {
        let startPage;
        AsyncStorage.getItem(lang.language)
        .then((res) => JSON.parse(res))
        .then((res) => {
            global.globalJson = res;
            startPage = global.globalJson.startPages.find(l => {
                return l.languageId == lang.languageId
            })
            global.languageId = lang.languageId;
            startPage = startPage ? startPage : lang;
            Actions.reset('home', {startPage: startPage.pageId});
        })
        
    }

    openLanguage = () => {
        return global.projectJson.languages.map((object, index) => {
            let isDisabled = this.isDisabled(object);
            return (
            <View key={index}>
                <TouchableOpacity disabled={isDisabled} style={[{ margin: 10, height: 37, width:150, alignItems: 'center', borderWidth: 1, borderColor: '#ddd'}, isDisabled ? {backgroundColor: '#cccccc'} : {backgroundColor: '#fff'}]} onPress={() => this.onclickLanguageText(object)}>
                    <Text style={{ fontSize: 23, color: '#757575' }} >{object.language}</Text>
                </TouchableOpacity>
            </View>
            );
        });
    };

    render() {
        return (
            <View style={styles.langCont} >
                {this.openLanguage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    langCont: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: '7%',
        height: 75,
        width: '100%',
        zIndex: 3,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default Languages;