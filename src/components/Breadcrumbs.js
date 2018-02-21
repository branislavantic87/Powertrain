import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import he from 'he';

export default class BreadcrumbsComponent extends Component {

  searchMenu(menuId) {
    return global.globalJson.menus[0].menu.find(element =>
      menuId == element.menuId
    )
  }

  getBreadcrumb = (menuId, breadcrumb = '') => {
    let foundMenu = this.searchMenu(menuId);

    if (foundMenu.depth == 1) {
      breadcrumb = foundMenu.title + breadcrumb;
      breadcrumb = he.decode(breadcrumb);
      return breadcrumb;
    } else {
      breadcrumb = '->' + foundMenu.title + breadcrumb;
      return this.getBreadcrumb(foundMenu.parentId, breadcrumb);
    }

  }

  render() {
    console.log('============');
    return (


      <View style={styles.breadcrumbsContainer}>
        <Text>{this.getBreadcrumb(this.props.from)}</Text>
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