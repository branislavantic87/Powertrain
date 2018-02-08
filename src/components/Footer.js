import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

class Footer extends Component {

    render() {

        return (

            <View style={styles.footbar}>

                <TouchableOpacity onPress={this.props.onPress} style={{paddingHorizontal: 40, paddingVertical: 15, position: "absolute" }}>
                    <Image style={styles.ico} source={require('./ico/32/main-menu.png')} />
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    footbar: {
        height: '7%',
       
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        borderColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
        
    },
    ico: {
        height: 48,
        width: 48,
        marginRight: 10,
    },
});

export default Footer;