import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Menu3 from './Menu3';
import { Actions } from 'react-native-router-flux';
import HTML from 'react-native-render-html';


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
                    from={this.props.from}
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
                <TouchableOpacity  style={[styles.menu2Item,  { borderColor: this.props.isPressed ? '#990000' : '#d8d8d8' }]} onPress={() => Actions.reset('HBF', { from: this.props.menu2, filtered: this.state.filteredPages, selected: this.props.selected })}>
                    <HTML containerStyle={styles.menu2Text} baseFontStyle={{color: '#da291c', fontSize: 12, fontWeight: 'bold' }}  html={this.props.menu2.title} />
                </TouchableOpacity>

                <View style={{ height: 250, flexWrap: 'wrap', borderRightColor: '#d8d8d8', borderRightWidth: 1, paddingRight: 20, paddingLeft: 20 }}>
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
        backgroundColor: '#d8d8d8',
        width: 250,
        height: 50,
        justifyContent: 'center',
        borderWidth: 1
    },
    menu2Text: {
        paddingLeft: 15,
    }
}

export default Menu2;