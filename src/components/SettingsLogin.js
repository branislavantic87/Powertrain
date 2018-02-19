import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, NetInfo, Platform, AsyncStorage, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import md5 from 'md5';
import { Actions } from 'react-native-router-flux';
import { isNetworkConnected } from '../../helpers';

export default class SettingsLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      isChecked: true,
      isConnected: false,
      userId: '',
    };

  }

  logIn() {
    const users = global.usersJson.users;
    const hashPass = md5(this.state.password);
    if (this.state.isConnected === false) {
      user = users.find(({ email, password }) => {
        return email === this.state.email && password === hashPass
      });
      if (user === undefined) {
        this.setState({
          email: '',
          password: ''
        });
        Alert.alert(
          '',
          'Incorrect username or password',
          [
            { text: 'Ok', onPress: () => { } }
          ]
        )
        // Da li praviti dozvolu logovanja preko TYPE, jer trenutno TYPE postoji samo za offline log in
      } else {
        this.setState({
          userId: user.userId,
          email: '',
          password: ''
        });
        this.setLoggedUser(user.userId);
        Alert.alert(
          'SUCCESS!',
          'You have logged in successfully',
          [
            { text: 'OK', onPress: () => this.props.onChange() },
          ],
          { cancelable: false }
        )
      }
    } else {
      let formData = new FormData();
      formData.append("email", this.state.email);
      formData.append("password", hashPass);
      fetch('http://www.cduppy.com/salescms/?a=ajax&do=loginUser&languageId=1&projectId=5&token=1234567890', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          res = JSON.parse(response._bodyText);
          if (res.hasOwnProperty("userId")) {
            this.setState({
              userId: res.userId,
              email: '',
              password: ''
            });
            this.setLoggedUser(res.userId);
            Alert.alert(
              'SUCCESS!',
              'You have logged in successfully',
              [
                { text: 'OK', onPress: () => this.props.onChange() }
              ],
              { cancelable: false }
            )
          } else {
            this.setState({
              email: '',
              password: ''
            });
            Alert.alert(
              '',
              'Incorrect username or password',
              [
                { text: 'Ok', onPress: () => { } }
              ]
            );
          }
        })
        .catch(error => this.setState({ error }));
    }
  }

  enableLogin() {
    const { email, password } = this.state;
    if (email !== '' && password !== '') {
      this.setState({ isChecked: false });
    } else if (email === '' || password === '') {
      this.setState({ isChecked: true });
    } else {
      this.setState({ isChecked: true })
    }
  }

  setLoggedUser(userId) {
    console.log('usao u setloggeduser')
    AsyncStorage.setItem('@userId', userId);
    console.log('Success write to AsyncStorage');
  }


  componentWillMount() {
    isNetworkConnected()
      .then(res => {
        this.setState(() => ({ isConnected: res }));
        return Promise.resolve();
      })
      .then(() => { console.log(this.state.isConnected) })
      .catch(error => console.log(error));
  }


  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.avoid}
          style={{ height: '100%', width: '100%' }}
          scrollEnabled={true}
          resetScrollToCoords={{ x: 0, y: 0 }} >
          <View style={{ height: '40%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', }}>
            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>USERNAME</Text>

            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              keyboardType="email-address"
              returnKeyType="next"
              value={this.state.email}
              onChangeText={email => { this.enableLogin(); this.setState({ email }) }}
              onSubmitEditing={() => this.password.focus()}
            />
            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>PASSWORD</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='white'
              secureTextEntry={true}
              returnKeyType="go"
              value={this.state.password}
              onChangeText={password => { this.enableLogin(); this.setState({ password }) }}
              ref={(input) => this.password = input}
            />

          </View>


                    <View style={styles.login}>
                        <TouchableOpacity style={this.state.isChecked ? styles.buttonLogDisabled : styles.buttonLog} onPress={this.logIn.bind(this)} disabled={this.state.isChecked}>
                            <Text style={this.state.isChecked ? styles.buttonTextDisabled : styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonReg} onPress={() => this.props.changeToSignUp()}>
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>

          </View>

          <View style={{ height: '20%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '84%', padding: 30 }}>
            <View style={styles.skip}>
              <TouchableOpacity onPress={() => this.props.changeToForgotPassword()} style={styles.skipBtn}><Text style={styles.tekst}>FORGOT PASSWORD</Text></TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
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
    login: {
        height: '40%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        paddingTop: 20
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
    buttonTextDisabled:{
        fontSize: 20,
        fontWeight: '100',
        color: "white",
        textAlign: 'center',
    },
    buttonLog: {
        backgroundColor: '#d8d8d8',
        width: '100%',
        height: '47%',
        justifyContent: 'center',
        marginBottom: 30
    },
    buttonLogDisabled:{
        backgroundColor: '#BDB9B9',
        width: '100%',
        height: '47%',
        justifyContent: 'center',
        marginBottom: 30
    },
    buttonReg: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#d8d8d8',
        width: '100%',
        height: '47%',
        justifyContent: 'center',
    },
    tekst: {
        color: "#959A9C",
        fontSize: 16
    },
    skip: {
        alignItems: 'flex-end',
        backgroundColor: 'white',
    },
    skipBtn: {
        alignItems: 'center',
        paddingTop: 25,
    },
    avoid: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
        paddingRight: '20%',
        paddingLeft: '20%'
    }
});