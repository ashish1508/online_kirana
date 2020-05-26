import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';
import StoreItems from '../Components/storeItems'
import Stores from '../Components/stores'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';


class ItemsView extends React.Component {
 

   render() {
            return (
                <View style = {styles.container}>
                    <Button title="Stores" onPress={()=>this.props.navigation.navigate("Stores")}/>
                    <StoreItems/>
                </View>
            )

   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ccc',
   }
});

const mapStateToProps = state => ({
    token: state.token,
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsView);