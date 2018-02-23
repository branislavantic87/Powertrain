import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage } from 'react-native';
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNFB from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import { findPageObjectById, findMenuObjectById, findMenu1Selected, findMenu } from '../../helpers';



export default class PresentationNewComponent extends Component {

    state = {
        fullPages: []
    }

    componentWillMount() {
        console.log('=-=-=-=-=-=-=pre sort CWM: ', this.props.itsPresentations);
        const fullPages = global.globalJson.pages.filter(gp => {
            if (this.props.itsPresentations.includes(gp.pageId)) {
                return gp;
            }
        })
        this.setState({ fullPages: fullPages });
    }

    deleteThisPageFromPresentation = (pageId) => {
        console.log('delete from pres', pageId);
        const nFPbyThisPresentation = this.state.fullPages.filter(fp => fp.pageId != pageId);
        const modP = { ime: this.props.itsName, pages: nFPbyThisPresentation.map(nfp => nfp.pageId) }
        try {
            AsyncStorage.getItem('Prezentacije')
                .then(res => JSON.parse(res))
                .then(res => {
                    const nP = res.map(pr => {
                        if (pr.ime == this.props.itsName) {
                            return modP;
                        } else {
                            return pr;
                        }
                    }
                    );
                    console.log(nP);
                    AsyncStorage.setItem('Prezentacije', JSON.stringify(nP));
                    this.setState({ fullPages: nFPbyThisPresentation });
                });

        } catch (e) {

        }
    }

    render() {

        return (

            <View style={styles.content}>

                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', zIndex: 5, marginTop: 15, marginRight: 10 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginRight: 50, flexDirection: 'row' }} onPress={() => { this.props.clickDone(); }}>
                        <Text style={{ fontSize: 16, color: '#757575' }}>Done</Text>
                        <Image style={{ height: 15, width: 15, marginLeft: 10 }} source={require('./ico/32/tick.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 50,
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            Actions.reset('HBF',
                                {
                                    filtered: this.state.fullPages,
                                    from: findMenuObjectById(this.state.fullPages[0].menuId),
                                    selected: findMenu1Selected(findMenuObjectById(this.state.fullPages[0].menuId)),
                                    indexStart: ''
                                })

                        }}>
                        <Text style={{ fontSize: 16, color: '#757575' }}>Play</Text>
                        <Image style={{ height: 15, width: 15, marginLeft: 10 }} source={require('./ico/32/tick.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.presentationView}>

                        {/*ispisi listu slajdova u prezentaciji*/}
                        {this.state.fullPages.map((fp, i) =>
                            <View key={fp.pageId} style={styles.presentation}>
                                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Actions.reset('HBF',
                                                {
                                                    filtered: this.state.fullPages,
                                                    from: findMenuObjectById(this.state.fullPages[0].menuId),
                                                    selected: findMenu1Selected(findMenuObjectById(this.state.fullPages[0].menuId)),
                                                    indexStart: i
                                                })
                                        }}>
                                        {fp.files.find(f => f.type == 'image') ?
                                            <Image style={styles.presentationImg}
                                                source={{ uri: 'file://' + RNFB.fs.dirs.DocumentDir + '/' + fp.files.find(f => f.type == 'image').filename }} />
                                            :
                                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        position: 'absolute',
                                        width: 55,
                                        height: 55,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                    }} onPress={() => {
                                        this.deleteThisPageFromPresentation(fp.pageId);
                                    }}>
                                        <Image
                                            source={require('./ico/img/deletePresentation.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.presentationTitle}>{fp.title || fp.subtitle}</Text>
                            </View>

                        )}

                    </View>
                </ScrollView>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        flex: 1,
        zIndex: 3,
        paddingLeft: '5%'
    },

    presentation: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 15,
    },

    presentationImg: {
        position: 'relative',
        width: 170,
        height: 80,
        padding: 5
    },

    presentationTitle: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 12
    },

    presentationView: {
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingLeft: '3%'
    }
});


