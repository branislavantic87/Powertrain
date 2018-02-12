import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, NetInfo, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import md5 from 'md5';
import RNFB from 'react-native-fetch-blob';
import { isNetworkConnected } from '../../helpers';

export default class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      surname: '',
      email: '',
      password: '',
      error: '',
      isConnected: false,
      msg: '',
    };
  }

  registerUser() {
    const { firstname, surname, email, password } = this.state;
    if (email === '' || password === '') {
      Alert.alert(
        '',
        'Email and password are mandatory!',
        [
          { text: 'Ok', onPress: () => { } }
        ]
      );
    } else if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*?\.[a-zA-Z]{2,3}$/) === null) { 
      Alert.alert(
        '',
        'Invalid email format',
        [
          { text: 'Ok', onPress: () => { } }
        ]
      );
    } else {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("surname", surname);
      formData.append("email", email);
      formData.append("password", md5(password));
      console.log(formData);
      fetch('http://www.cduppy.com/salescms/?a=ajax&do=registerUser&languageId=1&projectId=5&token=1234567890', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          console.log(response)
          res = JSON.parse(response._bodyText);
          if (res.hasOwnProperty("userId")) {
            this.setState({ firstname: '', surname: '', email: '', password: '' });
            Alert.alert(
              'You have registered successfully',
              'You have to log in to proceed',
              [
                { text: 'Log In', onPress: () => this.props.changeToLogin() },
                // { text: 'Cancel', onPress: () => {} }
              ]
            )
          } else {
            Alert.alert(
              '',
              (res.resultText.toUpperCase()),
              [
                { text: 'Ok', onPress: () => { } }
              ]
            );
          }
        })
        .then(() => this.myLoop())
        .catch(error => console.log(error));
    }
  }

  myLoop = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { this.fetchUserJson().then(() => resolve()).catch((err) => { console.log(err); myLoop(); return reject(); }) }, 2000);

    })
  }

  fetchUserJson = () => {
    console.log('okinuo fetchUserJson()');
    return new Promise((resolve, reject) => {
      fetch('http://www.cduppy.com/salescms/?a=ajax&do=getUsers&languageId=1&projectId=5&token=1234567890')
        .then(res => res.json())
        .then(res => {
          console.log(res.lastChanges);
          if (res.lastChanges == global.usersJson.lastChanges) {
            console.log('i dalje je stari online');
            return Promise.reject('Nije stigao novi json');
          } else {
            console.log('stigao novi');
            RNFB.fs.writeFile(RNFB.fs.dirs.DocumentDir + '/allUsers.json', JSON.stringify(res))
              .then(() => {
                global.usersJson = res;
                return Promise.resolve('stigao novi');
              })
          }
        })
        .then(() => resolve())
        .catch((err) => { console.log(err); return reject() })
    })
  }


  componentWillMount() {
    isNetworkConnected()
      .then(res => {
        this.setState(() => ({ isConnected: res }));
        return Promise.resolve();
      })
      .then(() => {
        if (this.state.isConnected === false) {
          this.setState({ msg: 'No internet connection, you can not register at the moment!' })
        }
      })
      .catch(error => console.log(error));
  }


  render() {
    return (
      <View style={styles.containerSignUp}>
        <Text style={styles.noInternetText}>{this.state.msg}</Text>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.avoid}
          style={{ height: '100%', width: '100%' }}
          scrollEnabled={true}
          resetScrollToCoords={{ x: 0, y: 0 }} >
          <View style={{ height: '60%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column', width: '80%', marginTop: 20 }}>

            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>E-MAIL</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              keyboardType="email-address"
              returnKeyType="next"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              onSubmitEditing={() => this.password.focus()}
            />
            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>PASSWORD</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              secureTextEntry={true}
              returnKeyType="next"
              ref={(input) => this.password = input}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              onSubmitEditing={() => this.firstname.focus()}
            />
            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>FIRST NAME</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              returnKeyType="next"
              ref={(input) => this.firstname = input}
              value={this.state.firstname}
              onChangeText={firstname => this.setState({ firstname })}
              onSubmitEditing={() => this.surname.focus()}
            />
            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>SURNAME</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              returnKeyType="next"
              value={this.state.surname}
              onChangeText={surname => this.setState({ surname })}
              ref={(input) => this.surname = input}
            />

          </View>
          <View style={styles.registerArea}>
            <TouchableOpacity style={this.state.isConnected ? styles.buttonSignUp : styles.buttonSignUpDisabled} onPress={this.registerUser.bind(this)} disabled={!this.state.isConnected}>
              <Text style={this.state.isConnected ? styles.buttonText : styles.buttonTextDisabled}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: '20%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '80%' }}>
            <View style={styles.alreadyBtn}>
              <TouchableOpacity onPress={() => this.props.changeToLogin()}><Text style={styles.tekst}>ALREADY HAVE AN ACCOUNT?</Text></TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  noInternetText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 30
  },
  containerSignUp: {
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
  registerArea: {
    height: '20%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingTop: 16
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
  buttonSignUp: {
    backgroundColor: '#d8d8d8',
    width: '100%',
    height: '70%',
    justifyContent: 'center',
  },
  buttonSignUpDisabled: {
    backgroundColor: '#BDB9B9',
    width: '100%',
    height: '70%',
    justifyContent: 'center',
  },
  tekst: {
    color: "#959A9C",
    fontSize: 16
  },
  alreadyBtn: {
    width: '100%',
    alignItems: 'center'
  },
  avoid: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%'
  }
});