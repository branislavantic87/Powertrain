import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, Platform, NetInfo, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      isConnected: false,
      msg: '',

    };
  }

  isNetworkConnected = () => {
    if (Platform.OS === 'ios') {
      return new Promise(resolve => {
        const handleFirstConnectivityChangeIOS = isConnected => {
          NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS);
          resolve(isConnected);
        };
        NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
      });
    }
    return NetInfo.isConnected.fetch();
  }

  forgotPassword() {
    users = global.allUsers.users;
    user = users.find(({ email }) => {
      return this.state.email === email;
    })
    if (user) {
      const formData = new FormData();
      formData.append("email", this.state.email);
      formData.append("password", user.password)
      fetch('http://www.cduppy.com/salescms/?a=ajax&do=passwordforgetUser&languageId=1&projectId=5&token=1234567890', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          console.log(response)
          res = JSON.parse(response._bodyText);
          if (res.hasOwnProperty("userId")) {
            this.setState({ email: '' });
            Alert.alert(
              'Request sent',
              'Check your email for further instructions',
              [
                { text: 'Ok', onPress: () => console.log('Ovde ide rerender cele aplikacije koju mora Marko da nam pomogne!') },
              ],
              { cancelable: false }
            )
          } else {
            Alert.alert(
              '',
              'Something went wrong. Please restart application and try again.',
              [
                { text: 'Try again', onPress: () => {} },
              ],
            );
          }
        })
        .catch(error => console.log(error));
    } else {
      Alert.alert(
        '',
        'Email does not exist.',
        [
          { text: 'Try again', onPress: () => {} },
        ],
      )
    }
  }


  componentWillMount() {
    this.isNetworkConnected()
      .then(res => {
        this.setState(() => ({ isConnected: res }));
        return Promise.resolve();
      })
      .then(() => {
        if (this.state.isConnected === false) {
          this.setState({ msg: 'No internet connection, you cannot proceed at the moment!' })
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.containerForgotPswd}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.avoid}
          style={{ height: '100%', width: '100%' }}
          scrollEnabled={true}
          resetScrollToCoords={{ x: 0, y: 0 }} >
          <View style={{ height: '40%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column', width: '70%' }}>
            <Text style={{ alignSelf: 'center', fontSize: 26, fontWeight: '700', color: 'black' }}>FORGOT PASSWORD </Text>
            <Text style={{ alignSelf: 'flex-start', fontSize: 16, marginTop: 30 }}>USERNAME</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              returnKeyType="next"
            />
          </View>
          <View style={{ height: '60%', width: '50%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', marginTop: 15 }}>
            <TouchableOpacity style={styles.buttonSubmit} onPress={this.forgotPassword.bind(this)} disabled={!this.state.isConnected}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={() => this.props.changeToLogin()}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>


    )
  }
}

const styles = StyleSheet.create({
  containerForgotPswd: {
    borderWidth: 24,
    borderColor: '#cccccc',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '100',
    color: "#424242",
    textAlign: 'center',
  },
  inputBox: {
    width: '100%',
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 18,
    color: "#757575",
    margin: 10,
    borderBottomWidth: 2,
    borderColor: "#d8d8d8"
  },
  avoid: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '26%'
  },
  buttonSubmit: {
    backgroundColor: '#d8d8d8',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    padding: 15
  },
  buttonCancel: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#d8d8d8',
    width: '100%',
    justifyContent: 'center',
    padding: 15
  },
});
