import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ForgotPassword extends Component {

    render() {

        return (

            <View style={styles.containerForgotPswd}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.avoid}
                    style={{ height: '100%', width: '100%' }}
                    scrollEnabled={true}
                    resetScrollToCoords={{ x: 0, y: 0 }} >
                    <View style={{ height: '40%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column', width: '70%'}}>
                        <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: '700', color: 'black' }}>FORGOT PASSWORD </Text>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 16, marginTop: 30 }}>USERNAME</Text>
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='white'
                            keyboardType="email-address"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={{ height: '60%', width: '50%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', marginTop: 15 }}>
                        <TouchableOpacity style={styles.buttonSubmit}>
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => this.props.changeToLogin()}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    containerForgotPswd: {
        borderWidth: 24,
        borderColor: '#cccccc',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '100',
        color: "#424242",
        textAlign: 'center',
    },
    inputBox: {
        width: '100%',
        height: 40,
        backgroundColor: "white",
        borderRadius: 5,
        fontSize: 18,
        color: "#757575",
        margin: 10,
        borderBottomWidth: 2,
        borderColor: "#d8d8d8"
    },
    avoid: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '26%'
    },
    buttonSubmit: {
        backgroundColor: '#d8d8d8',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
        padding: 15
    },
    buttonCancel: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#d8d8d8',
        width: '100%',
        justifyContent: 'center',
        padding: 15
    },
});
