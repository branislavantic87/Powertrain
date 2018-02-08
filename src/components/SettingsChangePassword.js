import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, AsyncStorage } from 'react-native';
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
      error: '',
    };
  }

  passwordMatch = (pass1, pass2) => {
    if ((pass1 === pass2) && (pass1 !== '' && pass2 !== '')) {
      this.setState({ isMatch: true })
    } else {
      this.setState({ isMatch: false })
    }
  }

  changePassword() {
    console.log('uso sam');
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('@userId')
        .then(res => {
          console.log(res);
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
              // fetch('http://www.cduppy.com/salescms/?a=ajax&do=passwordUser&languageId=1&projectId=5&token=1234567890', {
              //   method: 'POST',
              //   body: formData
              // })
              //   .then(response => {
              //     console.log(response)
              //     res = JSON.parse(response._bodyText);
              //     res.hasOwnProperty("userId") ?
              //       this.setState({ error: res.resultText.toUpperCase(), email: '', oldpassword: '', newpassword: '' }) :
              //       this.setState({ error: res.resultText.toUpperCase() })
              //   })
              //   .then()
              //   .catch(error => console.log(error));
            } else {
              this.setState({ error: 'New passwords don\'t match' });
            }
          } else {
            this.setState({ error: 'User not found!' });
          }
          return resolve();
        })
        .catch(error => console.log(error))
    })
  }


  render() {
    return (
      <View style={styles.containerChangePswd}>
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

            <TouchableOpacity style={styles.buttonConfirm} onPress={this.changePassword.bind(this)}>
              <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>

          </View>

        </KeyboardAwareScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
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
    paddingTop: '20%'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '100',
    color: "#424242",
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
