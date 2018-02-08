import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';

export default class BreadcrumbsComponent extends Component {

  render() {

    return (


      <View style={styles.breadcrumbsContainer}>
          <Text> BREADCRUMBS </Text>
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