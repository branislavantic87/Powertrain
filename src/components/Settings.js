import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, AsyncStorage, Switch, Alert } from 'react-native';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SettingsLanguage from './SettingsLanguage';
import SettingsFailedFiles from './SettingsFailedFiles';
import SettingsUpdate from './SettingsUpdate';
import SettingsLogin from './SettingsLogin';
import SettingsSignUp from './SettingsSignUp';
import SettingsForgotPassword from './SettingsForgotPassword';
import SettingsChangePassword from './SettingsChangePassword';



export default class SettingsComponent extends Component {

  state = {
    settings: '',
    settingsText: ''
  };



  renderContent = () => {
    switch (this.state.settings) {
      case 'languages': return <SettingsLanguage />;
      case 'failedFiles': return <SettingsFailedFiles />;
      case 'update': return <SettingsUpdate />;
      case 'login': return <SettingsLogin changeToSignUp={() => this.setState({ settings: 'signup' })} changeToForgotPassword={() => this.setState({ settings: 'forgotPassword' })} />;
      case 'signup': return <SettingsSignUp changeToLogin={() => this.setState({ settings: 'login' })} />;
      case 'forgotPassword': return <SettingsForgotPassword changeToLogin={() => this.setState({ settings: 'login' })} />;
      case 'changePassword': return <SettingsChangePassword />;
      default: return (<View></View>);
    }
  }


  render() {

    return (

      <View style={styles.content}>
        <View style={{ backgroundColor: '#fff', width: '40%', height: "100%", justifyContent: 'flex-start' }}>
          <TouchableOpacity style={[styles.btn_settings, styles.btn_version]} onPress={() => this.setState({ settingsText: global.projectJson.project.version })} disabled><Text style={styles.btn_version_text}>Version 2.0.0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={() => this.setState({ settings: 'languages' })}><Text style={styles.btn_text}>Languages</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={() => this.setState({ settings: 'update' })}><Text style={styles.btn_text}>Update</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={() => this.setState({ settings: 'login' })}><Text style={styles.btn_text}>Login</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={() => this.setState({ settings: 'failedFiles' })}><Text style={styles.btn_text}>Failed Files</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={() => this.setState({ settings: 'changePassword' })}><Text style={styles.btn_text}>Change Password</Text></TouchableOpacity>

          {/*
          <TouchableOpacity style={styles.btn_settings} onPress={() => this.setState({ settingsText: global.projectJson.project.version, failedFiles: false})}><Text style={styles.btn_text}>Version 2.0.0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={this.Imprint}><Text style={styles.btn_text}>Imprint</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={() => this.setState({ settingsText: global.projectJson.project.termsText })}><Text style={styles.btn_text}>Terms</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={() => this.setState({ settingsText: global.projectJson.project.copyrightText })}><Text style={styles.btn_text}>Copyrights</Text></TouchableOpacity> 
          */}

        </View>
        <View style={styles.renderContent}>
          {this.renderContent()}
        </View>


      </View>

    );
  }
}
const styles = StyleSheet.create({
  renderContent: {
    backgroundColor: '#fff', 
    width: '60%', height: "100%", 
    borderLeftWidth: 1, 
    borderLeftColor: '#dddddd'
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    height: '93%',
    flexDirection: 'row',
    position: 'absolute',
    top: '7%',
    zIndex: 3,
  },
  btn_settings: {
    backgroundColor: '#fff',
    height: "10%",
    width: "92%",
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
  },
  btn_text: {
    color: '#757575',
    fontSize: 25
  },
  btn_version: {
    backgroundColor: '#cccccc',
  },
  btn_version_text: {
    color: '#616161',
    fontSize: 25
  },
});


