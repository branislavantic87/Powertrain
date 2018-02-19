import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HTML from 'react-native-render-html';

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
                <TouchableOpacity style={[styles.menu2Item, { borderColor: this.props.isPressed ? '#dd0000'  : '#909090'  }]} onPress={() => Actions.reset('HBF', { from: this.props.menu4, filtered: this.state.filteredPages, selected: this.props.selected })}>
                    <HTML containerStyle={styles.menu4Text} baseFontStyle={{color: '#909090', fontSize: 12 }} html={this.props.menu4.title} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    menu4Item: {
      
        marginBottom: 5,
        marginLeft: 0,
        marginRight: 10,
        width: 250,
        height: 50
        //flex: 1
      
    },
    menu4Text: {
        backgroundColor: '#f2f2f2',
        paddingLeft: 15,
        
    },
    menu2Item: {
        width: 230,
        alignSelf: 'flex-end',
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#909090'
    },
}