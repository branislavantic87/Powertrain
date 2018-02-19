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
                    <Text numberOfLines={1} style={[styles.menu2Text, { color: this.props.isPressed ? '#f44336' : '#f44336' }, { borderColor: this.props.isPressed ? '#f44336' : '#E0E0E0' }]}>{this.props.menu2.title}</Text>
                </TouchableOpacity>

                <View style={{ height: 220, flexWrap: 'wrap', borderRightColor: '#dddddd', borderRightWidth: 1, paddingRight: 10 }}>
                    {this.renderMenus3()}

                </View>

            </View>
        );
    }
}

const styles = {
    menu2Item: {
        margin: 10,
        width: 200,
        backgroundColor: '#EEEEEE'
    },
    menu2Text: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        color: 'black',
        fontSize: 16,
        borderWidth: 1,
    }
}

export default Menu2;