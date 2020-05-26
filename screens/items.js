import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';
import StoreItems from '../Components/storeItems'
import Stores from '../Components/stores'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';


class ItemsView extends React.Component {
 

   render() {
            return (
                <SafeAreaView style={styles.container} >
                <View style={styles.container}>
                <View style = {styles.container}>
                    <Button title="Stores" onPress={()=>this.props.navigation.navigate("Stores")}/>
                
                    <StoreItems/>
                
                </View>
                {this.props.cart.length>0 &&
                <View style={styles.cart}>

                </View>}
                </View>
                </SafeAreaView>
            )

   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ccc',
   },
   cart:{
    position:"absolute",
    top:"93%",
    width:"98%",
    height:"6%",
    marginHorizontal:"1%",
    backgroundColor:"yellow",
    borderRadius:4
   }
});

const mapStateToProps = state => ({
    token: state.token,
    cart:state.cart
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsView);