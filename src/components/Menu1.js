import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


class Menu1 extends Component {

    render() {

        return (

            <View>
                <View style={styles.pdt}>
                    <TouchableOpacity onPress={this.props.onPress} style={[styles.menu1Item, { backgroundColor: this.props.isPressed ? '#dd0000' : '#d7d7d7' }]}>
                        <Text numberOfLines={1} style={{ paddingBottom: 6, fontSize: 16, color: this.props.isPressed ? 'white' : '#757575' }}>{this.props.menu1.title}</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
       
    },
    pdt: {
        paddingTop: 0
    }
}

export default Menu1;