import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Menu4 from './Menu4';


class Menu3 extends Component {

    state = { filteredPages: [] }

    componentWillMount() {

        this.filterPages();
    }

    filterPages() {

        var a = this.props.pages.filter(elem => { return elem.menuId == this.props.menu3.menuId });
        this.setState({ filteredPages: a });
    }

    renderMenus4 = () => {
        if (this.props.menu3.children) {
            console.log('renderMenus4');
            return this.props.menu3.children.map(child =>
                <Menu4
                    key={child.menuId}
                    menu4={child}
                    pages={this.props.pages}
                    isPressed={this.props.from == child.menuId ? true : false}
                    selected={this.props.selected}
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.menu3Item}>
                <TouchableOpacity style={styles.menu2Item} onPress={() => Actions.reset('HBF', { from: this.props.menu3, filtered: this.state.filteredPages, selected: this.props.selected })}>
                    <Text numberOfLines={1} style={[styles.menu3Text, { color: this.props.isPressed ? '#dd0000' : '#dd0000' }, { borderColor: this.props.isPressed ? '#dd0000' : '#909090' }]}>{this.props.menu3.title}</Text>
                </TouchableOpacity>

                    {this.renderMenus4()}
                     
           
        
            </View>
        );
    }
}

const styles = {
    menu3Item: {
        
        flexWrap: 'wrap'
        // flex: 1,
        //height: '100%'
    },
    menu3Text: {
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#909090'
    },
    menu2Item: {
        marginBottom: 10,
        marginLeft: 10,

        width: 200,
        
    },
}

export default Menu3;
