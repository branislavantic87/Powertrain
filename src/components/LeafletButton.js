import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Image, StyleSheet } from 'react-native';

export default class LeafletButton extends Component {

    // this.props.page == page {}

    state = {
        visibleTwoBtns: false,
        isActiveMainButton: false
    };

    addToLeaflet = () => {
        
    }


    render() {
        return (
            <View style={styles.floatingButtonsHolder}>
                <TouchableOpacity onPress={() => this.setState({ visibleTwoBtns: !this.state.visibleTwoBtns, isActiveMainButton: !this.state.isActiveMainButton })} style={styles.add}><Image style={styles.floatBtnAdd} source={ !this.state.isActiveMainButton ? require('./ico/add/add.png') : require('./ico/add/add_close_pressed.png')} /></TouchableOpacity>

                {this.state.visibleTwoBtns &&
                    <View>
                        <TouchableOpacity onPress={() => this.addToLeaflet()} style={styles.add_leaflet}><Image style={styles.floatBtnAdd} source={require('./ico/add/add_leaflet.png')} /></TouchableOpacity>
                        <TouchableOpacity style={styles.add_presentation}><Image style={styles.floatBtnAdd} source={require('./ico/add/add_mypresentation.png')} /></TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    floatingButtonsHolder: {
        position: 'absolute',
        width: 50,
        height: 158,

        zIndex: 49824982789,
        right: 0,
        top: 140
    },
    floatBtnAdd: {
        width: 50,
        height: 50,
    },

    add_leaflet: {
        paddingBottom: 4,
        paddingTop: 4,

    },
    add_presentation: {

    }
});