import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNFB from 'react-native-fetch-blob';



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

    render() {

        return (

            <View style={styles.content}>

                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', zIndex: 5, marginTop: 15, marginRight: 10 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginRight: 50, flexDirection: 'row' }} onPress={() => { this.props.clickDone(); }}>
                        <Text style={{ fontSize: 16, color: '#757575' }}>Done</Text>
                        <Image style={{ height: 15, width: 15, marginLeft: 10 }} source={require('./ico/32/tick.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.presentationView}>

                        {/*ispisi listu slajdova u prezentaciji*/}
                        {this.state.fullPages.map(fp =>
                            <View key={fp.pageId} style={styles.presentation}>
                                <View style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}>
                                    {fp.files.find(f => f.type == 'image') ?
                                        <Image style={styles.presentationImg}
                                            source={{ uri: 'file://' + RNFB.fs.dirs.DocumentDir + '/' + fp.files.find(f => f.type == 'image').filename }} />
                                        :
                                        <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                                    }
                                    <Image
                                        source={require('./ico/add/add_close_pressed.png')}
                                        style={{
                                            position: 'absolute',
                                            width: 55,
                                            height: 55,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            backgroundColor: 'transparent'
                                        }} />
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


