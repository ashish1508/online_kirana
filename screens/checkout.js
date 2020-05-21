import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';

class CheckoutView extends React.Component {
    _signOutAsync =  () => {
        this.props.removeUserToken()
            .then(() => {
            
            })
            .catch(error => {
                this.setState({ error })
            })
    };

   componentDidMount(){
    if(this.props.token.token === null){
        this.props.navigation.pop()
        this.props.navigation.navigate('Login')

    }
   }
   render() {
       
       
            return (
                <View style = {styles.container}>
                    <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
                    <Text>CHECKOUT PAGE</Text>
                
                </View>
            )

   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

const mapStateToProps = state => ({
    token: state.token,
});

const mapDispatchToProps = dispatch => ({
    removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutView);