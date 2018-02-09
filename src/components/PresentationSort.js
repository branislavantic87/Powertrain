import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default class PresentationNewComponent extends Component {

    state = {
        text: ''
    }

    render() {

        return (

            <View style={styles.content}>

                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', zIndex: 5, marginTop: 15, marginRight: 10 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginRight: 50, flexDirection: 'row' }} onPress={() => {this.props.clickDone(); }}>
                        <Text style={{ fontSize: 16, color: '#757575' }}>Done</Text>
                        <Image style={{ height: 15, width: 15, marginLeft: 10 }} source={require('./ico/32/tick.png')} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.presentationView}>

                        {/*ispisi listu slajdova u prezentaciji*/}
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>
                        <View style={styles.presentation}>
                            <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                            <Text style={styles.presentationTitle}>Presentation Name</Text>
                        </View>

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
        margin: 15
    },
    presentationImg: {
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


