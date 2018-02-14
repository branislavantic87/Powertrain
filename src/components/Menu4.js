import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Menu4 extends Component {

    state = {
        filteredPages: []
    };

    componentWillMount() {
        this.filterPages();
    }

    filterPages() {
        var a = this.props.pages.filter(elem => { return elem.menuId == this.props.menu4.menuId });
        this.setState({ filteredPages: a });
    }

    render() {
        return (
            <View style={styles.menu4Item}>
                <TouchableOpacity onPress={() => Actions.reset('HBF', { from: this.props.menu4, filtered: this.state.filteredPages, selected: this.props.selected })}>
                    <Text numberOfLines={1} style={[styles.menu4Text, { color: this.props.isPressed ? '#757575' : '#757575' }, { borderColor: this.props.isPressed ? /*'#f44336'*/ 'blue' : /*'#E0E0E0'*/ 'green' }]}>{this.props.menu4.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    menu4Item: {
        marginLeft: 20,
        padding: 10,
        //width: 200,
        //flex: 1
        height: 50
    },
    menu4Text: {
        padding: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#757575'
    }
}