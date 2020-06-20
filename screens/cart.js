import React from 'react';
import { StyleSheet, Text, View,Button,FlatList ,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken,reloadcart ,cart} from '../redux/actions';
import Icon from 'react-native-vector-icons/AntDesign';

class CartView extends React.Component {

    state = {
        
        data:[]
    }


    _signOutAsync =  () => {
        this.props.removeUserToken()
            .then(() => {
            
            })
            .catch(error => {
                this.setState({ error })
            })
    };

    componentDidMount(){
        
        let newdata = []
        Object.keys(this.props.cart.items).forEach((key,index)=>{
            newdata.push(this.props.cart.items[key])
        })
        this.setState({data:newdata})
        this.props.navigation.addListener('focus', this.onScreenFocus)
        
    }

    onScreenFocus = () => {
        console.log("focus...")
        console.log(this.props.cart.items)
        let newdata = []
        Object.keys(this.props.cart.items).forEach((key,index)=>{
            newdata.push(this.props.cart.items[key])
        })
        this.setState({data:newdata})
        console.log("cart")
      }
    addToCart = (item,vndx,indx) => {

        // console.log("........"+item)
        // console.log( this.props.cart.items)

        // let newcart = {...this.props.cart}
        let newdata = [...this.state.data]
        console.log("indx : "+indx)
        console.log(newdata[0])
        newdata[indx].variants[vndx].quant += 1
        newdata[indx].total_quant += 1
        itemdetails = {
            item:item,
            shop_id:this.props.shop.id
        }
        this.setState({data:newdata})
        this.props.to_cart(itemdetails)
       // this.props.reload_cart(newcart)

    }
    deleteFromCart = (item,vndx,indx) => {

        let newdata = [...this.state.data]
        
        newdata[indx].variants[vndx].quant -= 1
        newdata[indx].total_quant -= 1
        if(newdata[indx].total_quant === 0){
            newdata = newdata.slice(0, indx).concat(newdata.slice(indx + 1, newdata.length))
        }
        itemdetails = {
            item:item,
            shop_id:this.props.shop.id
        }
        this.setState({data:newdata})
        this.props.to_cart(itemdetails)
    }
   render() {
    
    //console.log(this.state.data)
    console.log("cart rendered")     
    console.log(this.state.data)
       if(this.state.data.length===0){
           return(
               <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
                   <Text>No items in the cart... !!!!!!!</Text>
               </View>
           )
       }
            return (
                <View style = {styles.container}>
                 
                    <View style={{height:"10%",marginHorizontal:"1%",width:"98%",backgroundColor:"yellow",alignItems:"center",justifyContent:"center"}}>
                        <Text style={{fontSize:20}} adjustsFontSizeToFit>Shop{this.props.cart.shop_id}</Text>
                    </View>
                    <FlatList
                    data={this.state.data}
                    style={{backgroundColor:"#ccc"}}
                    numColumns={1}
                    keyExtractor={(x, i) => i.toString()}
                    // onEndReached={() => this.handleEnd()}
                    // onEndReachedThreshold={0.3}
                    // ListEmptyComponent = {()=>this.defaultlistbackground()}
                    // ListFooterComponent={() =>
                    //   this.state.loading
                    //     ? <ActivityIndicator size="large" animating />
                    //     : null}
                    renderItem={({ item ,index}) =>
                    item.variants.map((variant,vndx) =>{
                        if(variant.quant > 0)
                     return(        <View style={styles.header} key={variant.var_id}>
                                <Image
                                    style={{width:"40%",height:"100%"}}
                                    source={{uri:item.image}}
                                />
                                <View style={styles.titleview}>
                                    <View style={styles.title}>
                                        <Text adjustsFontSizeToFit numberOfLines={1} style={{fontFamily:"PoetsenOne-Regular"}} >{item.name}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.dropdown} >
                                        <View  style={{flexDirection:'row'}}>
                                            <Text>{variant.qty}</Text>
                                            <Text style={{marginLeft:"3%"}}>{variant.var_id}</Text>
                                            

                                        </View>
                                    </TouchableOpacity>

                                    <View style={{position:'absolute', top:'60%', height:"40%",marginHorizontal:'5%', flexDirection:'row', width:'90%'}}>
                                        <Text adjustsFontSizeToFit>MRP {variant.price}</Text>
                                        
                                    
                                   
                                        <View style={{height:'100%',width:'60%',position:'absolute',right:0,flexDirection:"row"}}>
                                        <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#f9ed32",backgroundColor:"#fffd8d",}} onPress={()=>this.addToCart(index)}>
                                        <Icon name="plus" size={20} color="black" />
                                        </TouchableOpacity>
                                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><Text>{item.variants[item.def_id].quant}</Text></View>
                                        <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#f9ed32",backgroundColor:"#fffd8d",}} onPress={()=>this.deleteFromCart(index)}>
                                        <Icon name="minus" size={20} color="black" />
                                        </TouchableOpacity>

                                    </View>

                                    </View>  
                                </View>
                            </View> )  
                    }                             
                    )
                    }
                    />
                {!(Object.keys(this.props.cart.items).length === 0 && this.props.cart.items.constructor === Object) &&
                <TouchableOpacity style={styles.cart}>
                    <Text>CHECKOUT</Text>
                </TouchableOpacity>}
                </View>
            )

   }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: '#ccc',
    },
    header:{
         
         backgroundColor:"white",
         width:"98%",
         aspectRatio:3,
         marginHorizontal:"1%",
         flexDirection:"row",
         borderRadius:5,
         borderWidth:3,
         borderColor:"#ccc",
     
         
 
         
    },
    img:{
         height:"100%",
         width:"40%",
         
        // backgroundColor:"black"
    },
    titleview:{
         height:"100%",
         width:"60%",
         //backgroundColor:"blue"
    },
    title:{
        marginTop:"3%",
        height:"30%",
        width:"95%",
       
        fontFamily:"PoetsenOne-Regular",
       // backgroundColor:"red",
        color:"#1A3A3A",
        marginHorizontal:"5%"
    },
    lcn:{
     position:"absolute",
     top:"50%",
    // backgroundColor:"red",
     height:"15%",
     width:"100%",
    // backgroundColor:"red",
     marginHorizontal:"5%"
    },
    dist :{
     position:"absolute",
     top:"75%",
     height:"18%",
     marginHorizontal:"5%",
     color:"#4F517D",
     
    },
 
    dropdown:{
     height:'20%',position:'absolute',top:'30%',marginHorizontal:'5%',width:'80%',borderColor:'#ccc',
 
    },
    id:{
        height:'20%',position:'absolute',top:'30%',marginHorizontal:'5%',width:'80%',
    
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
    cart : state.cart,
    shop:state.shop
});

const mapDispatchToProps = dispatch => ({
    to_cart:(itemdetails) => dispatch(cart(itemdetails)),
    removeUserToken: () => dispatch(removeUserToken()),
   // reload_cart : (cart)=>dispatch(reloadcart(cart))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartView);