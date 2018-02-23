import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage, Alert } from 'react-native';
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PresentationSort from './PresentationSort';



export default class PresentationNewComponent extends Component {

    state = {
        text: '',
        sort: false,
        prezentacije: [],
        error: undefined
    }

    createNewPresentation = (e) => {
        console.log('konzola od e', e)
        let foundObject = this.state.prezentacije.find(pre => (
            pre.ime === this.state.text
        ))
        if (!foundObject) {
            let prezentacija = [{
                ime: this.state.text,
                pages: []
            }]
            novePrezentacije = prezentacija.concat(this.state.prezentacije);
            this.setState({ prezentacije: novePrezentacije });
            AsyncStorage.setItem('Prezentacije', JSON.stringify(novePrezentacije))
            this.setState({ text: '' })
        } else {
            Alert.alert('Takva prezentacija vec postoji', 'Promenite ime', [{ text: 'OK', onPress: () => { } }])
        }
    }

    addPagesToPresentation = (imePrezentacije) => {
        console.log('kliknuo si na', imePrezentacije);
        let modP = this.state.prezentacije.find(p => imePrezentacije == p.ime);
        if (this.props.lookingAt.length) {
            if (!modP.pages.find(pa => pa == this.props.lookingAt[0].pageId)) {
                modP.pages = modP.pages.concat(this.props.lookingAt[0].pageId);
                console.log(modP);
                const nP = this.state.prezentacije.map(pr => {
                    if (pr.ime == imePrezentacije) {
                        return modP;
                    } else {
                        return pr;
                    }
                });
                console.log('nove prezentacije:', nP);
                AsyncStorage.setItem('Prezentacije', JSON.stringify(nP));
            } else {
                Alert.alert('This page is allready in it!', 'Please select another page for your presentation', [{ text: 'OK', onPress: () => { } }])
            }
        } else {
            Alert.alert('This is not page!', 'Please select page for your presentation', [{ text: 'OK', onPress: () => { } }])
        }


    }



    componentWillMount() {
        try {
            AsyncStorage.getItem('Prezentacije')
                .then(res => JSON.parse(res))
                .then(res => { res ? this.setState({ prezentacije: res }) : '' });

        } catch (e) {

        }
    }
    presentationSort = () => {
        if (this.state.sort) {
            return <PresentationSort clickDone={() => this.setState({ sort: false })} />
        } else {
            return (
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', zIndex: 5, marginTop: 10, marginRight: 10 }}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 25 }} onPress={() => this.props.closePresentation()}>
                            <Image style={{ height: 20, width: 20 }} source={require('./ico/32/back.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputView}>
                        <Image style={{ height: 50, width: 50 }} source={require('./ico/32/starP.png')} />
                        <View style={{ flexDirection: 'row', }}>
                            <TextInput
                                keyboardType='default'
                                placeholder="New presentation"
                                style={styles.input}
                                onChangeText={(text) => {
                                    this.setState({ text });
                                }}
                                value={this.state.text}
                            />
                            <TouchableOpacity onPress={(e) => { this.createNewPresentation() }} >
                                <Image style={{ height: 20, width: 20 }} source={require('./ico/32/addP.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.addTo}>Add to ...</Text>

                    <View style={styles.presentationView}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {this.state.prezentacije.map(p => (
                                <TouchableOpacity
                                    key={p.ime}
                                    style={styles.presentation}
                                    onPress={() => {
                                        // this.setState({ sort: true });
                                        this.addPagesToPresentation(p.ime)
                                    }}>
                                    <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                                    <Text style={styles.presentationTitle}>{p.ime}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            );
        }
    }

    render() {
        console.log('Ovo je state: ', this.state.prezentacije)
        return (

            <View style={styles.content}>



                {/*ispisi listu prezentacija*/}
                {this.presentationSort()}



            </View>

        );
    }
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        width: '100%',
        height: '93%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        top: '7%',
        flex: 1,
        zIndex: 3,
        paddingLeft: '5%'
    },

    inputView: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    addTo: {
        paddingLeft: '4%',
        margin: 10
    },

    input: {
        backgroundColor: 'white',
        width: 300,
        height: 50,
        fontSize: 24,
        marginLeft: 10
    },
    presentation: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    presentationImg: {
        width: 100,
        height: 50,
        padding: 5
    },

    presentationTitle: {
        paddingLeft: 15,
        fontSize: 14
    },

    presentationView: {
        flex: 20,
        paddingLeft: '4%'
    }
});


