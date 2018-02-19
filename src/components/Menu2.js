import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Menu3 from './Menu3';
import { Actions } from 'react-native-router-flux';


class Menu2 extends Component {

    state = { filteredPages: [] };

    componentWillMount() {

        this.filterPages();
    }

    renderMenus3() {

        if (this.props.menu2.children) {
            return this.props.menu2.children.map(child =>
                <Menu3
                    key={child.menuId}
                    menu3={child}
                    pages={this.props.pages}
                    isPressed={this.props.from == child.menuId ? true : false}
                    selected={this.props.selected}
                />
            );
        }
    }

    filterPages() {
        var a = this.props.pages.filter(elem => { return elem.menuId == this.props.menu2.menuId });
        this.setState({ filteredPages: a });
    }

    render() {

        return (

            <View >
                <TouchableOpacity style={styles.menu2Item} onPress={() => Actions.reset('HBF', { from: this.props.menu2, filtered: this.state.filteredPages, selected: this.props.selected })}>
                    <Text numberOfLines={1} style={[styles.menu2Text, { color: this.props.isPressed ? '#dd0000' : '#dd0000' }, { borderColor: this.props.isPressed ? '#d7d7d7' : '#d7d7d7' }]}>{this.props.menu2.title}</Text>
                </TouchableOpacity>

                <View style={{ height: 220, flexWrap: 'wrap', borderRightColor: '#d7d7d7', borderRightWidth: 1, paddingRight: 20, paddingLeft: 20 }}>
                    {this.renderMenus3()}
                </View>

            </View>
        );
    }
}

const styles = {
    menu2Item: {
        margin: 5, 
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        width: 200,
        backgroundColor: '#d7d7d7'
    },
    menu2Text: {
        backgroundColor: '#d7d7d7',
        padding: 13,
        color: 'black',
        fontSize: 16,
        borderWidth: 1,
        fontSize: 12,
        paddingLeft: 15
    }
}

export default Menu2;