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
                <View style={{ width: '65%', height: '100%' }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/*ispisati sve produkte*/}

                        <View style={styles.productView}>

                            <View style={styles.checkBtn}>
                                <TouchableOpacity style={styles.checkBtnTouch}>
                                    <Image style={{ height: 15, width: 15, marginLeft: 10 }} source={require('./ico/32/check-not.png')} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.product}>

                                <View style={styles.ImgTitle}>

                                    <View style={styles.image}>
                                        <Image style={{ height: 90, width: 120 }} source={require('./ico/img/product.png')} />
                                    </View>

                                    <View style={styles.title}>

                                        <Text style={{ color: '#da281c', fontSize: 14, padding: 5 }}>Category</Text>
                                        <Text style={{ fontSize: 18, padding: 5, color: 'black' }}>Product Title</Text>

                                    </View>
                                </View>

                                <View style={styles.inputView}>

                                    <TextInput
                                        keyboardType='default'
                                        placeholder="Comment"
                                        style={styles.input}
                                        onChangeText={(text) => {
                                            this.setState({ text });
                                        }}
                                        value={this.state.text}
                                    />
                                    <TouchableOpacity>
                                        <Image style={{ height: 15, width: 15 }} source={require('./ico/32/back.png')} />
                                    </TouchableOpacity>

                                </View>


                            </View>


                        </View>

                        {/*druga test komponenta*/}

                        <View style={styles.productView}>

                            <View style={styles.checkBtn}>
                                <TouchableOpacity style={styles.checkBtnTouch}>
                                    <Image style={{ height: 15, width: 15, marginLeft: 10 }} source={require('./ico/32/check-not.png')} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.product}>

                                <View style={styles.ImgTitle}>

                                    <View style={styles.image}>
                                        <Image style={{ height: 90, width: 120 }} source={require('./ico/img/product.png')} />
                                    </View>

                                    <View style={styles.title}>

                                        <Text style={{ color: '#da281c', fontSize: 14, padding: 5 }}>Category</Text>
                                        <Text style={{ fontSize: 18, padding: 5, color: 'black' }}>Product Title</Text>

                                    </View>
                                </View>

                                <View style={styles.inputView}>

                                    <TextInput
                                        keyboardType='default'
                                        placeholder="Comment"
                                        style={styles.input}
                                        onChangeText={(text) => {
                                            this.setState({ text });
                                        }}
                                        value={this.state.text}
                                    />
                                    <TouchableOpacity>
                                        <Image style={{ height: 15, width: 15 }} source={require('./ico/32/back.png')} />
                                    </TouchableOpacity>

                                </View>


                            </View>


                        </View>

                    </ScrollView>
                </View>

                <View style={{ width: '35%', height: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={{ width: '70%', height: '30%', justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }}>

                        <TouchableOpacity style={{ flex: 1, width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, marginBottom: 10 }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Image style={{ height: 15, width: 15 }} source={require('./ico/32/tick.png')} />
                            </View>
                            <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ padding: 5, textAlign: 'left', color: 'black', fontSize: 18 }}>Select all</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, backgroundColor: '#b7bf11' }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Image style={{ height: 15, width: 15 }} source={require('./ico/32/tick-white.png')} />
                            </View>
                            <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ padding: 5, textAlign: 'left', color: 'white', fontSize: 18 }}>Forward</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, backgroundColor: '#da281c' }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Image style={{ height: 15, width: 15 }} source={require('./ico/32/cancel-white.png')} />
                            </View>
                            <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ padding: 5, textAlign: 'left', color: 'white', fontSize: 18 }}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
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
        padding: 20,
        paddingRight: 5
    },

    input: {
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        fontSize: 14,
        marginLeft: 10,
        textAlign: 'left'
    },
    productView: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 200,
        marginLeft: '5%',
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
        borderBottomWidth: 0.5,
        borderColor: 'black'
    },
    checkBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 50
    },
    checkBtnTouch: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    product: {
        flex: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    ImgTitle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'row'
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    title: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    inputView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%', height: '100%',
        flexDirection: 'row'
    },

});


