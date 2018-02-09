import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, AsyncStorage, NetInfo, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import md5 from 'md5';



export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      user: {},
      email: '',
      oldpassword: '',
      newpassword: '',
      confirm_newpassword: '',
      isMatch: false,
      isConnected: false,
      error: '',
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

  passwordMatch = (pass1, pass2) => {
    if ((pass1 === pass2) && (pass1 !== '' && pass2 !== '')) {
      this.setState({ isMatch: true })
    } else {
      this.setState({ isMatch: false });
    }
  }

  changePassword() {
    console.log('uso sam');
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('@userId')
        .then(res => {
          this.setState({ userId: res })
          return resolve();
        })
        .then(() => {
          const users = global.allUsers.users;
          let user = users.find(user => {
            return user.userId === this.state.userId
          });
          return user;
        })
        .then(user => {
          this.setState({ user })
          const { oldpassword, newpassword, confirm_newpassword } = this.state;
          return this.passwordMatch(newpassword, confirm_newpassword);
        })
        .then(() => console.log('Logovanje pre provere usera' + JSON.stringify(this.state)))
        .then(() => {
          if (this.state.user && this.state.user.password === md5(this.state.oldpassword)) {
            console.log('Ovo je user iz password match: ', JSON.stringify(this.state.user));
            if (this.state.isMatch) {
              const formData = new FormData();
              formData.append("email", this.state.user.email);
              formData.append("oldpassword", md5(this.state.oldpassword));
              formData.append("newpassword", md5(this.state.newpassword));
              this.setState({ error: 'Passwords match!' });
              console.log(formData);
              console.log(this.state.error)
              fetch('http://www.cduppy.com/salescms/?a=ajax&do=passwordUser&languageId=1&projectId=5&token=1234567890', {
                method: 'POST',
                body: formData
              })
                .then(response => {
                  console.log(response)
                  res = JSON.parse(response._bodyText);
                  if (res.hasOwnProperty("userId")) {
                    this.setState({ oldpassword: '', newpassword: '', confirm_newpassword: '' });
                    Alert.alert(
                      'Password changed successfully.',
                      'Please, Log In again to proceed.',
                      [
                        { text: 'Ok', onPress: this.changePasswordHandler.bind(this) },
                      ]
                    );

                  } else {
                    Alert.alert(
                      '',
                      'Something went wrong. Please restart application and try again.',
                      [
                        { text: 'Try again', onPress: () => { } },
                      ],
                    );
                  }
                })
                .then()
                .catch(error => console.log(error));
            } else {
              Alert.alert(
                '',
                'New password does not match confirmed new password!',
                [
                  { text: 'Ok', onPress: () => { } },
                ]
              );
            }
          } else {
            Alert.alert(
              '',
              'Old password does not match with current user!',
              [
                { text: 'Ok', onPress: () => { } },
              ]
            );
          }
          return resolve();
        })
        .catch(error => console.log(error))
    })
  }

  logOutGlobally = () =>  {
    const formData = new FormData();
    formData.append("id", this.state.userId);
    console.log('FORMDATA: ' + formData);
    // fetch('http://www.cduppy.com/salescms/?a=ajax&do=logoutUser&projectId=5&token=1234567890', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then((res) => console.log(res))
    // .catch(error => console.log(error));
  }

  logOutFromApp() {
    AsyncStorage.removeItem('@userId', (error) => {
      if (error) {
        console.log(error);
      }
    })
  }


  redirectToLogin() {
    this.props.changeToLogin();
  }

  changePasswordHandler() {
    this.props.logout();
    this.logOutGlobally();
    this.logOutFromApp();
    // this.redirectToLogin.bind(this); rerender APP to accept incoming changes
  }



  componentWillMount() {
    this.isNetworkConnected()
      .then(res => {
        this.setState(() => ({ isConnected: res }));
        return Promise.resolve();
      })
      .then(() => {
        if (this.state.isConnected === false) {
          this.setState({ msg: 'No internet connection, you cannot change password at the moment!' })
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.containerChangePswd}>
        <Text style={styles.noInternetText}>{this.state.msg}</Text>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.avoid}
          style={{ height: '100%', width: '100%' }}
          scrollEnabled={true}
          resetScrollToCoords={{ x: 0, y: 0 }} >
          <View style={{ height: '70%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '70%', marginTop: 40 }}>
            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>OLD PASSWORD</Text>

            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              secureTextEntry={true}
              returnKeyType="next"
              value={this.state.oldpassword}
              onChangeText={oldpassword => this.setState({ oldpassword })}
              onSubmitEditing={() => this.oldpassword.focus()}
            />
            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>NEW PASSWORD</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              secureTextEntry={true}
              returnKeyType="next"
              onSubmitEditing={() => this.newpassword.focus()}
              value={this.state.newpassword}
              onChangeText={newpassword => this.setState({ newpassword })}
              ref={(input) => this.oldpassword = input}
            />
            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>CONFIRM NEW PASSWORD</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              secureTextEntry={true}
              returnKeyType="go"
              value={this.state.confirm_newpassword}
              onChangeText={confirm_newpassword => this.setState({ confirm_newpassword })}
              ref={(input) => this.newpassword = input}
            />
          </View>

          <View style={{ height: '30%', width: '50%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: 15 }}>

            <TouchableOpacity style={this.state.isConnected ? styles.buttonConfirm : styles.buttonConfirmDisabled} onPress={this.changePassword.bind(this)} disabled={!this.state.isConnected}>
              <Text style={this.state.isConnected ? styles.buttonText : styles.buttonTextDisabled}>CONFIRM</Text>
            </TouchableOpacity>

          </View>

        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  noInternetText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40
  },
  containerChangePswd: {
    borderWidth: 24,
    borderColor: '#cccccc',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15%'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '100',
    color: "#424242",
    textAlign: 'center',
  },
    buttonTextDisabled: {
    fontSize: 20,
    fontWeight: '100',
    color: "white",
    textAlign: 'center',
  },
  buttonReg: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#d8d8d8',
    width: '100%',
    height: '47%',
    justifyContent: 'center',
    padding: 5
  },
  buttonConfirm: {
    backgroundColor: '#d8d8d8',
    width: '100%',
    height: '47%',
    justifyContent: 'center',
    marginBottom: 6,
    padding: 15
  },
  buttonConfirmDisabled:{
    backgroundColor: '#BDB9B9',
    width: '100%',
    height: '47%',
    justifyContent: 'center',
    marginBottom: 6,
    padding: 15
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
    alignItems: 'center'
  }
});
