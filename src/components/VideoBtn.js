import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class VB extends Component {

    render() {

        return (
            
          <View style={{width: 160}}>

                <TouchableOpacity disabled={this.props.disabled} style={styles.ButtonContent} onPress={() => Actions.VideoView({ videouri: this.props.videouri })}>
                    <Image
                        style={styles.ButtonIconStyle2}
                        source={require('./ico/x64/video-tour.png')}
                    />
                    <Text style={styles.ButtonTextStyle}>VIDEO</Text>
                </TouchableOpacity >

            </View>
        );
    }
}

const styles = StyleSheet.create({

    ButtonTextStyle: {
        fontSize: 14,
        color: '#494F52'
    },
    ButtonIconStyle2: {
        marginRight: 10,
        width: 24,
        height: 24
    },
    ButtonContent: {
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 4,
        width: '100%',
        backgroundColor: '#CFCFCF',
        padding: 9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});