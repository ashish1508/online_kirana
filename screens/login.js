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


import { connect } from 'react-redux';
import { saveUserToken } from '../redux/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';



class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
      signedin:false
    }
  }

 

  componentDidMount(){
      
     
  }



  _signInAsync = () => {
    console.log("fetching")

  fetch('https://grocee.thenomadic.ninja/api/usr_login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
  
      },
      body: JSON.stringify({
        username: "admin@grocery.com",
        password: "password",
      }),
    }).then((response)=>(response.json()))
       .then((json)=> {
          //this.props.navigation.navigate("Categories")
          console.log(json)
          token = json.token;
          console.log("login : ")
          console.log(token)
          this.props.saveUserToken(token)
          .then(() => {
              this.props.navigation.navigate('Stores');
          })
          .catch((error) => {
           // this.props.navigation.navigate("Categories")
             this.setState({ error })
          })
        })
        .catch((error) => {
          //this.props.navigation.navigate("Categories")
          console.error(error);
        });
      
    
    
    token = "123"

    };




  render() {
    return (
      <View style={styles.container}>
        <View style={{position:"absolute",top:120,width:"100%",justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontFamily:"Acme-Regular",fontSize:50}}>Online Kirana</Text>
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

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this._signInAsync}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() =>  this.props.navigation.navigate('Signup')}>
            <Text>Go To Signup</Text>
            
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9ed32',
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
    saveUserToken: (data) => dispatch(saveUserToken(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
 