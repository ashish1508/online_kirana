import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';

class ProfileView extends React.Component {
    _signOutAsync =  () => {
        this.props.removeUserToken()
            .then(() => {
            
            })
            .catch(error => {
                this.setState({ error })
            })
    };

   render() {
       
       
            return (
                <View style = {styles.container}>
                    <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
                    <Text>PROFILE PAGE</Text>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);