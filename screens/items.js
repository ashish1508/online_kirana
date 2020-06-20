import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity,Dimensions,TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';
import StoreItems from '../Components/storeItems2'
import Stores from '../Components/stores'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

class ItemsView extends React.Component {
 

   render() {
            return (
                <SafeAreaView style={styles.container} >
                <View style={styles.container}>
                <View style = {styles.container}>

                <View style={{width:"100%",aspectRatio:3.5,backgroundColor:"#f9ed32"}}>

                    <View style={{flexDirection:"row",width:"98%",marginTop:"2%",marginHorizontal:"1%",aspectRatio:9}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                         <Text style={{marginLeft:"5%",fontFamily:"Acme-Regular",fontSize:20}} adjustsFontSizeToFit>{this.props.shop.name}</Text>
                        </View>
                        {/* <View style={{flex:2,alignItems:"center",justifyContent:"center"}}>
                        <Icon style={{fontSize:(width*0.50)/7,margin:"2%"}}  name="shoppingcart"  color="black" />
                        </View>
                        <View style={{flex:2,alignItems:"center",justifyContent:"center"}}>
                        <Icon style={{fontSize:(width*0.50)/7,margin:"2%"}}  name="user"  color="black" />
                        </View> */}
                        
                    </View>


                    <View style={{width:"96%",aspectRatio:9,margin:"2%",backgroundColor:"white",flexDirection:"row"}}>
                        
                            <Icon style={{fontSize:(width*0.50)/9,margin:"2%"}}  name="search1"  color="#aaa" />
                            <TextInput 
                            style={{flex:1}} 
                            allowFontScaling={false}
                            placeholder={"Search for products"}
                            placeholderTextColor={"#aaa"}/>
                        

                    </View>

                </View>

                <View style={{flex:1}}>
                    <StoreItems/>
                </View>
                
                </View>
                {!(Object.keys(this.props.cart.items).length === 0 && this.props.cart.items.constructor === Object) &&
                <TouchableOpacity style={styles.cart} onPress={()=>this.props.navigation.navigate("Cart")}>
                        <Text>GO TO CART</Text>
                </TouchableOpacity>}
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
    justifyContent:"center",
    alignItems:"center",
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
    cart:state.cart,
    shop:state.shop
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsView);