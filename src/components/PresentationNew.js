import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PresentationSort from './PresentationSort';



export default class PresentationNewComponent extends Component {

    state = {
        text: '',
        sort: false
    }

    presentationSort = () => {
        if (this.state.sort) {
            return <PresentationSort  clickDone={() => this.setState( { sort: false } )} />
        } else {
            return (
                <View>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', zIndex: 5, marginTop: 10, marginRight: 10 }}>
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
                            <TouchableOpacity>
                                <Image style={{ height: 20, width: 20 }} source={require('./ico/32/addP.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.addTo}>Add to ...</Text>
                    <View style={styles.presentationView}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TouchableOpacity style={styles.presentation} onPress={() => this.setState({ sort: true })}>
                                <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                                <Text style={styles.presentationTitle}>Presentation Name</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.presentation} onPress={() => this.setState({ sort: true })}>
                                <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                                <Text style={styles.presentationTitle}>Presentation Name</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            );
        }
    }

    render() {

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


