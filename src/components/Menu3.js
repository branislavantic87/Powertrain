import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Menu4 from './Menu4';
import HTML from 'react-native-render-html';


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
                <TouchableOpacity style={[styles.menu2Item, { borderColor: this.props.isPressed ? '#da291c' : '#909090' }]} onPress={() => Actions.reset('HBF', { from: this.props.menu3, filtered: this.state.filteredPages, selected: this.props.selected,  })}>
                    <HTML containerStyle={styles.menu3Text} baseFontStyle={{color: '#da291c', fontSize: 12}} html={this.props.menu3.title} />
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
        paddingLeft: 15        
    },
    menu2Item: {
        marginBottom: 5,
        width: 250,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        marginRight: 10,
    },
}

export default Menu3;
