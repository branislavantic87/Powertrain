import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';

class Menu1 extends Component {

    render() {

        return (

            <View>
                <View style={styles.pdt}>
                    <TouchableOpacity onPress={this.props.onPress} style={[styles.menu1Item, { backgroundColor: this.props.isPressed ? '#dd0000' : '#d7d7d7' }]}>
                        <HTML containerStyle={{ paddingBottom: 6, paddingLeft: 5}} baseFontStyle={{color: this.props.isPressed ? 'white' : '#757575', fontSize: 12, textAlign: 'left' }} html={this.props.menu1.title} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    menu1Item: {
        marginLeft: 0,
        marginRight: 0,
        borderRightWidth:1,
        borderColor: '#fff',
        height: 50,
        width: 300,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
       
    },
    pdt: {
        paddingTop: 0
    }
}

export default Menu1;