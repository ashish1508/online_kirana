import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { saveUserToken } from '../redux/actions';
import validator from '../Helpers/validation'
class SignupView extends Component {

  constructor(props) {
    super(props);
  }
  state = {
    email   : '',
    password: '',
    name:'',
    nameerr:null,
    emailerr:null,
    passerr:null,
    signedin:false,
  }

  _signInAsync = () => {
     this.fieldHandler("name",this.state.name)
     this.fieldHandler("email",this.state.email)
     this.fieldHandler("password",this.state.password)

    const ue = this.state.nameerr
    const ee = this.state.emailerr
    const pe = this.state.passerr
    console.log("errors")
    console.log(ue)
    console.log(ee)
    console.log(pe)
    if(ue===null && ee===null && pe===null){
      console.log("fetching")
      fetch('https://grocee.thenomadic.ninja/api/usr_register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.name,
          email:this.state.email,
          password: this.state.password,
        }),
      }).then((response)=>(response.json()))
         .then((json)=> {
            //this.props.navigation.navigate("Categories")
            console.log(json)
            token = json.token;
            console.log("signup: ")
            console.log(token)
            this.props.saveUserToken(token)
            .then(() => {
                this.props.navigation.navigate('Stores');
            })
            .catch((error) => {
             // this.props.navigation.navigate("Categories")
             console.log(error)
               this.setState({ error })
            })
          })
          .catch((error) => {
            //this.props.navigation.navigate("Categories")
            console.log(error)
            console.error(error);
          });






    }

    // this.props.saveUserToken()
    //     .then(() => {
    //         this.props.navigation.navigate('Home');
    //     })
    //     .catch((error) => {
    //         this.setState({ error })
    //     })
    };


 fieldHandler = async (field,value) => {
   let err = validator(field,value)
  //  console.log("name : ")
  //  console.log(va.trim())
  //  console.log("nameerr : " + nameerr)
   if(value==='') err =  "Please enter a " + field
  //console.log(this.state.nameerr)
  if(field==="name"){
    await  this.setState({name:value,nameerr:err})
  }
  if(field==="email"){
   await  this.setState({email:value,emailerr:err})
  }
  if(field==="password"){
    await this.setState({password:value,passerr:err})
  }
  
   
 }


  render() {
  
    return (
      <View style={styles.container}>
        <View style={{position:"absolute",top:100,width:"100%",justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontFamily:"Acme-Regular",fontSize:50}}>Online Kirana</Text>
        </View>
       
        <View style={styles.inputContainer}>
            
            <TextInput style={styles.inputs}
                placeholder="Name"
                underlineColorAndroid='transparent'
                onChangeText={(name) =>(this.fieldHandler("name",name))}/>
                
        </View>
        {( this.state.nameerr !== null) && 
        <View style={{width:"80%",aspectRatio:9,marginHorizontal:"10%",backgroundColor:"",justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:15,color:"red"}}>{this.state.nameerr}</Text>
        </View>
        }
        <View style={styles.inputContainer}>
          
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => (this.fieldHandler("email",email))}/>
        </View>
        {( this.state.emailerr !== null) && <Text>{this.state.emailerr}</Text>}
        <View style={styles.inputContainer}>
        
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => (this.fieldHandler("password",password))}/>
        </View>
        {( this.state.passerr !== null) && <Text>{this.state.passerr}</Text>}
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this._signInAsync}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>

        {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Go To Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text> */}
            
        {/* </TouchableHighlight> */}
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
      marginTop:40,
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
    marginTop:40,
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
  saveUserToken: (token) => dispatch(saveUserToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupView);