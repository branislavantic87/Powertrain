import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, AsyncStorage, Alert } from 'react-native';
import Modal from 'react-native-modal';

export default class PresentationModal extends Component {
    state = {
        prezentacije: []
    };

    componentWillMount() {
        try {
            AsyncStorage.getItem('Prezentacije')
                .then(res => JSON.parse(res))
                .then(res => { res ? this.setState({ prezentacije: res }) : '' })
                .then(()=> console.log(this.state.prezentacije))

        } catch (e) {
            console.error(e);
        }


    }

    addPagesToPresentation = (imePrezentacije) => {
        console.log('kliknuo si na', imePrezentacije);
        let modP = this.state.prezentacije.find(p => imePrezentacije == p.ime);
        if (this.props.lookingAt) {
            if (!modP.pages.find(pa => pa == this.props.lookingAt.pageId)) {
                modP.pages = modP.pages.concat(this.props.lookingAt.pageId);
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

    render() {
        // {console.log(this.state.prezentacije)}
        // console.log('Ovo je props od prezentacija: ', this.props.svePrezentacije)
        return (
            <Modal
                isVisible={this.props.handleModal}
                onBackdropPress={() => this.props.closeModal()}
                onBackButtonPress={() => this.props.closeModal()}
            >
                <View style={styles.modalContainer}>
                <ScrollView>
                    <View style={styles.innerContainer}>
                        {this.state.prezentacije.map(p => (
                        <View key={p.ime}>
                            <TouchableOpacity
                                    style={styles.presentation}
                                    onPress={() => {
                                        // this.setState({ sort: true });
                                        this.addPagesToPresentation(p.ime)
                                    }}>
                                    <Image style={styles.presentationImg} source={require('./ico/img/pres.jpg')} />
                                    <Text style={styles.presentationTitle}>{p.ime}</Text>
                                </TouchableOpacity>
                        </View>
                        ))}
                    </View>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        maxHeight: Dimensions.get('window').height*0.8
    },
    innerContainer: {
        alignItems: 'center',
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
    }
});