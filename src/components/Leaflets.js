import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, AsyncStorage, Switch, Alert, ScrollView, Image } from 'react-native';

export default class LeafletTestComponent extends Component {

  state = {
    text: ''
  }

    renderContent = () => {
        switch (this.state.settings) {
            case 'languages': return <SettingsLanguage />;
            case 'failedFiles': return <SettingsFailedFiles />;
            case 'update': return <SettingsUpdate />;
            case 'login': return <SettingsLogin changeToSignUp={() => this.setState({ settings: 'signup' })} changeToForgotPassword={() => this.setState({ settings: 'forgotPassword' })} />;
            case 'signup': return <SettingsSignUp changeToLogin={() => this.setState({ settings: 'login' })} />;
            case 'forgotPassword': return <SettingsForgotPassword changeToLogin={() => this.setState({ settings: 'login' })} />;
            case 'changePassword': return <SettingsChangePassword />;
            default: return (<View></View>);
        }
    }


    render() {

        return (

            <View style={styles.content}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/*ispisati sve produkte*/}

                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: 500, flexDirection: 'row' }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: '20%', width: '100%', height: '100%' }}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ height: 15, width: 15, marginLeft: 10 }} source={require('./ico/32/check-not.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>

                            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>

                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                    <Image style={{ height: 50, width: 70 }} source={require('./ico/img/product.png')} />
                                </View>

                                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'row' }}>

                                    <Text style={{ color: '#da281c', fontSize: 14, padding: 5 }}>Category</Text>
                                    <Text style={{ fontSize: 18, padding: 5 }}>Product Title</Text>

                                </View>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>

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
                                    <Image style={{ height: 20, width: 20 }} source={require('./ico/32/back.png')} />
                                </TouchableOpacity>

                            </View>


                        </View>


                    </View>

                </ScrollView>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    renderContent: {
        backgroundColor: '#fff',
        width: '60%', height: "100%",
        borderLeftWidth: 1,
        borderLeftColor: '#dddddd'
    },
    content: {
        backgroundColor: 'white',
        width: '100%',
        height: '93%',
        flexDirection: 'row',
        position: 'absolute',
        top: '7%',
        zIndex: 3,
    },
    btn_settings: {
        backgroundColor: '#fff',
        height: "10%",
        width: "92%",
        marginLeft: 20,
        borderWidth: 1,
        borderColor: '#dddddd',
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
    },
    btn_text: {
        color: '#757575',
        fontSize: 25
    },
    btn_version: {
        backgroundColor: '#cccccc',
    },
    btn_version_text: {
        color: '#616161',
        fontSize: 25
    },
    input: {
        backgroundColor: 'white',
        width: 300,
        height: 50,
        fontSize: 16,
        marginLeft: 10
    },
});


