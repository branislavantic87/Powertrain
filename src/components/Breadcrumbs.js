import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import he from 'he';

export default class BreadcrumbsComponent extends Component {

  state = {
    menustr: '',
    "1": false,
    "2": false,
    "3": false,
    "4": false

  }

  searchMenu(menuId) {
    return global.globalJson.menus[0].menu.find(element =>
      menuId == element.menuId
    )
  }

  getBreadcrumb = (menuId, breadcrumb = '') => {
    let foundMenu = this.searchMenu(menuId);
    this.setState({ [foundMenu.depth]: foundMenu.title });
    if (foundMenu.depth == 1) {
      breadcrumb = foundMenu.title + breadcrumb;
      breadcrumb = he.decode(breadcrumb);
      return breadcrumb;
    } else {
      breadcrumb = '->' + foundMenu.title + breadcrumb;
      return this.getBreadcrumb(foundMenu.parentId, breadcrumb);
    }

  }

  componentWillMount() {
    console.log('============');
    this.setState({ menustr: this.getBreadcrumb(this.props.from) });

  }
rr

  render() {
    return (


      <View style={styles.breadcrumbsContainer}>
        <Text>{this.state.menustr}</Text>


        <View>
          <Text>{this.state["1"]}</Text>
          <Text>{this.state["2"]}</Text>
          <Text>{this.state["3"]}</Text>
          <Text>{this.state["4"]}</Text>
        </View>
      </View>


    );
  }
}
const styles = StyleSheet.create({

  breadcrumbsContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '93%',
    flexDirection: 'column',
    position: 'absolute',
    top: '7%',
    zIndex: 3,
  },


});