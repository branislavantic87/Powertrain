import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

export default class MyComponent extends Component {
    state = {
        prezentacije: this.props.svePrezentacije
    };

    render() {
        // {console.log(this.state.prezentacije)}
        console.log('Ovo je props od prezentacija: ', this.props.svePrezentacije)
        return (
            <Modal
                isVisible={this.props.handleModal}
                onBackdropPress={() => this.props.closeModal()}
                onBackButtonPress={() => this.props.closeModal()}
            >
                <View style={styles.modalContainer}>
                <ScrollView>
                    <View style={styles.innerContainer}>
                        {this.props.svePrezentacije.map(p => (
                        <View key={p.ime}>
                            <TouchableOpacity
                                    style={styles.presentation}
                                    onPress={() => {
                                        // this.setState({ sort: true });
                                        // this.addPagesToPresentation(p.ime)
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