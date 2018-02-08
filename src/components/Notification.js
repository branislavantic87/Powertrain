import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';


export default class NotificationComponent extends Component {


  render() {


    return (

      <View style={styles.sidebar}>
        <View style={styles.notificationsLayout}>
          <View style={[styles.notifications_heading, styles.btn_version]} onPress={this.Version}>
            <Image style={styles.ico} source={require('./ico/x32/notification.png')} />
            <Text style={styles.btn_notification_text}>Notifications</Text>
            <TouchableOpacity><Image style={styles.icoClose} source={require('./ico/x64/close.png')} r /></TouchableOpacity>
          </View>

          {/* <SingleNotification> */}
          <View style={styles.single_notification_holder}>
            <View style={styles.single_notification}>
              <View style={styles.wraper}>
                <Text style={styles.textDate}>2014-12-31</Text>
                <Text style={styles.textTitle}>Short Title</Text>
                <Text style={styles.textNotificationContent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
              </View>
            </View>
            <View style={styles.reload_holder}><TouchableOpacity><Image style={styles.icoReload} source={require('./ico/x64/reload.png')} /></TouchableOpacity></View>
          </View>
          {/* </SingleNotification> */}

          {/* <SingleNotification> */}
          <View style={styles.single_notification_holder}>
            <View style={styles.single_notification}>
              <View style={styles.wraper}>
                <Text style={styles.textDate}>2014-12-31</Text>
                <Text style={styles.textTitle}>Short Title</Text>
                <Text style={styles.textNotificationContent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
              </View>
            </View>
            <View style={styles.reload_holder}><TouchableOpacity><Image style={styles.icoReload} source={require('./ico/x64/reload.png')} /></TouchableOpacity></View>
          </View>
          {/* </SingleNotification> */}

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  sidebar: {
    backgroundColor: 'white',
    width: '40%',
    height: '93%',
    flexDirection: 'row',
    position: 'absolute',
    top: '7%',
    zIndex: 3,
    right: 0
  },

  notificationsLayout: {
    backgroundColor: '#fff',
    width: '100%',
    height: "100%",
    justifyContent: 'flex-start',
    borderLeftWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center'
  },

  notifications_heading: {
    backgroundColor: '#fff',
    height: "10%",
    width: "100%",
    marginLeft: 0,
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    justifyContent: 'center',
    marginTop: 0,
    alignItems: 'center',
    flexDirection: 'row'
  },

  btn_text: {
    fontSize: 25,
    color: '#757575'
  },

  btn_notification_text: {
    color: '#757575',
    fontSize: 25,
    marginLeft: 5,
  },

  text: {
    fontSize: 20,
  },

  ico: {
    height: 32,
    width: 32,
    marginLeft: 5,
  },

  icoClose: {
    height: 32,
    width: 32,
    marginLeft: 250,
  },

  icoReload: {
    height: 32,
    width: 32,
  },

  single_notification_holder: {
    flexDirection: 'row'
  },

  single_notification: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#dddddd',
    height: 180,
    width: '75%',
    borderRadius: 25,
    borderTopLeftRadius: 0,
    backgroundColor: '#f5f5f5',
  },

  reload_holder: {
    width: '20%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  textNotificationContent: {
    paddingTop: 5,
    color: '#757575',
    textAlign: 'left'
  },

  textTitle: {
    paddingTop: 5,
    color: '#424242',
    fontSize: 18
  },

  textDate: {
    color: '#757575',
  },

  wraper: {
    padding: 10
  },

});