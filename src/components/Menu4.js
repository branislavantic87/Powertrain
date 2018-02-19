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
                <TouchableOpacity style={styles.menu2Item} onPress={() => Actions.reset('HBF', { from: this.props.menu4, filtered: this.state.filteredPages, selected: this.props.selected })}>
                    <Text numberOfLines={1} style={[styles.menu4Text, { color: this.props.isPressed ? '#757575' : '#757575' }, { borderColor: this.props.isPressed ? '#dd0000'  : '#909090'  }]}>{this.props.menu4.title}</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = {
    menu4Item: {
      
        marginBottom: 10,
        marginLeft: 10,
        width: 200,
        //flex: 1
      
    },
    menu4Text: {
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#909090',
        color: '#909090'
    },
    menu2Item: {
        width: 180,
        alignSelf: 'flex-end'
    },
}