import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { saveUserToken } from '../redux/actions';
class SignupView extends Component {

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
      name:'',
      signedin:false,
    }
  }

  _signInAsync = () => {
    this.props.saveUserToken()
        .then(() => {
            this.props.navigation.navigate('Home');
        })
        .catch((error) => {
            this.setState({ error })
        })
    };





  render() {
    return (
      <View style={styles.container}>

       
        <View style={styles.inputContainer}>
            
            <TextInput style={styles.inputs}
                placeholder="Name"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(name) => this.setState({name})}/>
        </View>
        <View style={styles.inputContainer}>
          
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
        
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._signInAsync}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Go To Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text>
            
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
 
const mapStateToProps = state => ({
  token: state.token,
});


const mapDispatchToProps = dispatch => ({
  saveUserToken: () => dispatch(saveUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupView);