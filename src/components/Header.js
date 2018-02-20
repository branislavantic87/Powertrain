import React, { Component } from 'react';
import { StyleSheet, View, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, TextInput, Alert, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HTML from 'react-native-render-html';
import RNRestart from 'react-native-restart';
import RNFB from 'react-native-fetch-blob';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isNetworkConnected } from '../../helpers';



export default class Header extends Component {

  state = {
    isConnected: true,
    refresh: true
  };

  openLanguage = () => {
    this.props.onPressLang();
  };

  openHome = () => {
    Actions.reset('home', { lang: global.language });
  };

  openFavorites = () => {
    Actions.reset('login')
  };

  openPresentation = () => {
    this.props.onPressPresentation();
  };

  openSearch = () => {
    this.props.onPressSearch();
  };

  openSettings = () => {
    this.props.onPressSettings();
  };

  openDashboard = () => {
    this.props.onPressDashboard();
  };

  openBreadcrumbs = () => {
    this.props.onPressBreadcrumbs();
  };

  openLeaflets = () => {
    this.props.onPressLeaflets();
  };

  openMediaCenter = () => {
    this.props.onPressMediaCenter();
  };

  openVideos = () => {
    this.props.onPressVideos();
  };

  openVideoTour = () => {
    this.props.onPressVideos();
  };

  openNotification = () => {
    this.props.onPressNotification();
  };

  openMagna = () => {
    alert('This is Magna! :)')
  };

  divider = () => {
    alert('This is Magna! :)')

  };

  componentWillMount() {
    isNetworkConnected()
      .then(res => res ? this.setState({ isConnected: true }) : this.setState({ isConnected: false }));
  }

  refresh = () => {
    this.setState({ refresh: !this.state.refresh });
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }


  render() {

    return (

      <View style={styles.navbarH}>

        <StatusBar barStyle="dark-content" hidden={true} />
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ flex: 3.5, alignItems: 'center', alignSelf: 'center', width: '100%' }}><HTML html={this.props.title ? this.props.title : ''} /></View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableWithoutFeedback disabled onPress={this.openDashboard}><Image style={styles.ico} source={this.props.whatIsOpen != 'dashboard' ? require('./ico/top-bar/dashboard.png') : require('./ico/top-bar/dashboard_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openLanguage}><Image style={styles.ico} source={this.props.whatIsOpen != 'language' ? require('./ico/top-bar/language.png') : require('./ico/top-bar/language_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback disabled onPress={this.openBreadcrumbs}><Image style={styles.ico} source={this.props.whatIsOpen != 'breadcrumbs' ? require('./ico/top-bar/breadcrumbs.png') : require('./ico/top-bar/breadcrumbs_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback disabled={true} onPress={this.divider}><Image style={styles.ico} source={require('./ico/x64/divider.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback disabled onPress={this.openPresentation}><Image style={styles.ico_smaller_2} source={this.props.whatIsOpen != 'presentation' ? require('./ico/top-bar/presentation.png') : require('./ico/top-bar/presentation_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback disabled onPress={this.openLeaflets}><Image style={styles.ico_smaller} source={this.props.whatIsOpen != 'leaflets' ? require('./ico/top-bar/leaflets.png') : require('./ico/top-bar/leaflets_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openSearch}><Image style={styles.ico} source={this.props.whatIsOpen != 'search' ? require('./ico/top-bar/search.png') : require('./ico/top-bar/search_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback disabled onPress={this.openVideos}><Image style={styles.ico} source={this.props.whatIsOpen != 'videos' ? require('./ico/top-bar/videos.png') : require('./ico/top-bar/videos_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback disabled onPress={this.openMediaCenter}><Image style={styles.ico_smaller_3} source={this.props.whatIsOpen != 'mediacenter' ? require('./ico/top-bar/media_center.png') : require('./ico/top-bar/media_center_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback disabled onPress={this.openNotification}><Image style={styles.ico_smaller_4} source={this.props.whatIsOpen != 'notifications' ? require('./ico/top-bar/notifications.png') : require('./ico/top-bar/notifications_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openSettings}><Image style={styles.ico} source={this.props.whatIsOpen != 'settings' ? require('./ico/top-bar/settings.png') : require('./ico/top-bar/settings_pressed.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback disabled={true} onPress={this.divider}><Image style={styles.ico} source={require('./ico/x64/divider.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openHome}><Image style={styles.ico} source={this.state.isConnected ? require('./ico/x64/magna.png') : require('./ico/x64/magna_offline.png')} /></TouchableWithoutFeedback>
          </View>
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({

  navbarH: {
    height: '7%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: "center",
    flexDirection: 'row',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#dddddd'
  },
  ico: {
    height: 24,
    width: 24,
    marginLeft: 15
  },

  ico_smaller: {
    height: 24,
    width: 17,
    marginLeft: 15,
  },

  ico_smaller_2: {
    height: 24,
    width: 30.5,
    marginLeft: 15,
  },

  ico_smaller_3: {
    height: 24,
    width: 37,
    marginLeft: 15,
  },
  ico_smaller_4: {
    height: 24,
    width: 25.5,
    marginLeft: 15,
  }

});