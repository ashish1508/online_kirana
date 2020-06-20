import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken,addtocart,removefromcart,incquantincart,decquantincart,refreshitems,cart,clearcart } from '../redux/actions';

import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';




class StoreItems extends React.Component{ 
    
    state = {
       // isModalVisible: false,
        arr2:this.props.items,
        data:[],
        model:{
            details:[],
            pointer:-1
        },
        cart:[],
        page:1,
        loading:false,
        next:false,
        cartmodal:false,
        firstindex:-1

      };
     
      fetchData = async () => {
        this.setState({ loading: true });
        console.log("fetching page : "+this.state.page)
        // console.log(this.props.token)
        
        //console.log(this.props.token.token)
        const response = await fetch('https://grocee.thenomadic.ninja/api/get_items', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token:this.props.token.token,
              page: this.state.page,
              shop_id:this.props.shop.id
            }),
          })
          const json = await response.json()
         //console.log("-------")
          
          let prods  =  json.products
          prods.map((prod,index) => {
            if(this.props.shop.id===this.props.cart.shop_id && prod.name in this.props.cart.items){
                // console.log("......")
                // console.log(prod.name)
                prods[index] = this.props.cart.items[prod.name]
            }else{
                prod.def_id = 0
                prod.total_quant=0
                prod.variants.map(variant => {variant.quant=0})

            }

          })
         //console.log(json.products[0])
          
         this.setState(state => ({
                data: [...state.data, ...json.products],
                next:json.has_next,
                loading: false
              }));

      };

    handleEnd = () => {
        console.log("handle end")
        if(this.state.next)
        this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    };

    componentDidMount(){
        console.log("items mounted: ")
         this.fetchData();
    }

    componentWillUnmount(){
        console.log("items unmount")
        this.props.refresh_items(this.state.arr2)
    }
    toggleModal2=()=>{
        this.setState({isModalVisible:!this.state.isModalVisible})
    }

    toggleModal = (ind) => {
        let new_m={
            ...this.state.model
        }
        new_m.details=this.state.data[ind].variants
        new_m.pointer=ind
        this.setState({isModalVisible: !this.state.isModalVisible,model:new_m});
      };

    changeHandler=(index,var_indx)=>{
  
        const new_data=[
            ...this.state.data
        ]
        new_data[index].def_id = var_indx
   
        this.setState({data:new_data},()=>{
        this.toggleModal2()
        })
    }
    handleShopChange = (choice) => {
        if(choice==1){
            this.props.clear_cart(this.props.shop.id)
            let index = this.state.firstindex
            let newdata = this.state.data
            let item = newdata[index]
        
            item.variants[item.def_id].quant += 1
            item.total_quant += 1
            newdata[index] = item
    
            this.setState({data:newdata,cartmodal:false})
            let itemdetails = {
                item:item,
                shop_id:this.props.shop.id
            }
            this.props.to_cart(itemdetails)
           
        }else{
            this.setState({cartmodal:false})
        }
        
    }
    addToCart = (index)=>{
        console.log("called " + this.props.shop.id + " " + this.props.cart.shop_id)
        if(
         this.props.cart.shop_id!==-1 &&
         this.props.shop.id !== this.props.cart.shop_id &&
         !(Object.keys(this.props.cart.items).length === 0 && this.props.cart.items.constructor === Object)){
            this.setState({cartmodal:true,firstindex:index})

        }
        else{
            let newdata = this.state.data
            let item = newdata[index]
        
            item.variants[item.def_id].quant += 1
            item.total_quant += 1
            newdata[index] = item
    
            this.setState({data:newdata})
            let itemdetails = {
                item:item,
                shop_id:this.props.shop.id
            }
            this.props.to_cart(itemdetails)
        }
        
    
       


    }

    deleteFromCart=(index)=>{
        let newdata = this.state.data
        let item = newdata[index]
        // console.log("^^^^^^^^")
        item.variants[item.def_id].quant -= 1
        item.total_quant -= 1
        newdata[index] = item
        // console.log(item)
        this.setState({data:newdata}) 
        itemdetails = {
            item:item,
            shop_id:this.props.shop.id
        }
        this.props.to_cart(itemdetails)       

    }

      render(){
        // console.log("global shop : ")
        // console.log(this.props.shop)
        //  console.log("global cart")
        //  console.log(this.props.cart)
        // console.log("ïtems rendered")


        return(
        <View style={styles.container}>

            <FlatList
                        data={this.state.data}
                        style={{backgroundColor:"#ccc",flex:1}}
                        keyExtractor={(x, i) => i.toString()}
                        onEndReached={() => this.handleEnd()}
                        onEndReachedThreshold={0.3}
                       // ListEmptyComponent = {()=>this.defaultlistbackground()}







                        ListFooterComponent={() =>
                          this.state.loading
                            ? <ActivityIndicator size="large" animating />
                            : null}
                        renderItem={({ item,index }) =>

                        <View style={styles.header} key={item.prod_id}>
                            <Image
                                style={{width:"40%",height:"100%"}}
                                source={{uri:item.image}}
                            />
                            <View style={styles.titleview}>
                                <View style={styles.title}>
                                    <Text adjustsFontSizeToFit numberOfLines={1} style={{fontFamily:"PoetsenOne-Regular"}} >{item.name}</Text>
                                </View>
                                <TouchableOpacity style={styles.dropdown} onPress={()=>this.toggleModal(index)}>
                                    <View  style={{flexDirection:'row'}}>
                                        <Text>{item.variants[item.def_id].qty}</Text>
                                        <Text style={{marginLeft:"3%"}}>{item.variants[item.def_id].var_id}</Text>
                                        <Icon style={{position:'absolute',right:5}}name="down" size={20} color="#aaa" />

                                    </View>
                                </TouchableOpacity>

                                <View style={{position:'absolute', top:'60%', height:"40%",marginHorizontal:'5%', flexDirection:'row', width:'90%'}}>
                                    <Text adjustsFontSizeToFit>MRP {item.variants[item.def_id].price}</Text>
                                    {(item.variants[item.def_id].quant===0) && 
                                <TouchableOpacity style={{position:'absolute',height:"100%",width:"60%",right:0,borderWidth:2,backgroundColor:"#fffd8d",borderColor:"#f9ed32"}} onPress={()=>this.addToCart(index)} >
                                        <View style={{flex:1,alignItems:'center',justifyContent:"center",}} >
                                           <Text adjustsFontSizeToFit style={{fontSize:16}}>Add to Cart</Text>

                                        </View>
                                    </TouchableOpacity>}
                                
                                {(item.variants[item.def_id].quant!==0) && 
                                <View style={{height:'100%',width:'60%',position:'absolute',right:0,flexDirection:"row"}}>
                                        <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#f9ed32",backgroundColor:"#fffd8d",}} onPress={()=>this.addToCart(index)}>
                                        <Icon name="plus" size={20} color="black" />
                                        </TouchableOpacity>
                                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><Text>{item.variants[item.def_id].quant}</Text></View>
                                        <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#f9ed32",backgroundColor:"#fffd8d",}} onPress={()=>this.deleteFromCart(index)}>
                                        <Icon name="minus" size={20} color="black" />
                                        </TouchableOpacity>

                                    </View> }
                                </View>  
                            </View>


                            <Modal isVisible={this.state.isModalVisible} animationIn={"bounceIn"} animationInTiming={0} backdropOpacity={0.80} onBackdropPress={() => this.setState({isModalVisible: false})}>
                                <View style={{width:'100%', height:'40%', justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
                                    {this.state.model.details.map((x,var_indx) => {
                                        
                                        return(
                                        
                                        <TouchableOpacity onPress={()=>this.changeHandler(this.state.model.pointer,var_indx)} key={var_indx} style={{borderWidth:1,borderColor:'#ccc',marginTop:'5%',justifyContent:'center',width:'100%',flexDirection:'row'}}>  
                                        <View style={{flexDirection:'row'}} >   
                                            <Text style={{marginRight:'2%'}}>Quantity: {x.qty}</Text>
                                            <Text>Price: {x.price}</Text>
                                            <Text>id: {x.var_id}</Text>
                                        </View>
                                        </TouchableOpacity>
                                        
                                        )
                                    })}
                                </View>
                            </Modal> 
                        </View>     
                    } />

                    <Modal isVisible={this.state.cartmodal} animationIn={"bounceIn"} animationInTiming={0} onBackdropPress={() => this.setState({cartmodal: false})}>
                        <View style={{width:'100%', height:'40%', alignItems:"center",justifyContent:"center",flexDirection:"column", backgroundColor:'white'}}>
                            <Text>Do you want to remove your items from shop{this.props.cart.shop_id} from the cart ?</Text>
                            <View style={{flexDirection:"row"}}>
                                <TouchableOpacity style={{backgroundColor:"yellow"}} onPress={()=>this.handleShopChange(1)}>
                                    <Text>YES</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:"yellow",marginHorizontal:"2%"}} onPress={()=>this.handleShopChange(0)}>
                                    <Text>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal> 





            </View>

        )















          
        //   return(
        //     this.state.arr2.map((i,indx) =>{
                
        //         return (
                
        //         <View style={styles.header} key={i.name}>
        //             <Image
        //                 style={{width:"40%",height:"100%"}}
        //                 source={require('../Components/sup120.jpg')}
        //             />
        //             <View style={styles.titleview}>
        //             <View style={styles.title}>
        //                  <Text adjustsFontSizeToFit numberOfLines={1} style={{fontFamily:"PoetsenOne-Regular"}} >{i.name}</Text>
        //             </View>
        //             <TouchableOpacity style={styles.dropdown} onPress={()=>this.toggleModal(indx)}>
        //                     <View  style={{flexDirection:'row'}}>
        //                             <Text>{i.def_det.qu}</Text>
        //                         <Icon style={{position:'absolute',right:5}}name="down" size={20} color="#aaa" />

        //                     </View>
        //             </TouchableOpacity>


        //             <View style={{position:'absolute', top:'60%', height:"20%",marginHorizontal:'5%', flexDirection:'row', width:'100%'}}>
        //                         <Text adjustsFontSizeToFit>MRP {i.def_det.pri}</Text>

                                // {(i.def_det.quant===0) && 
                                // <TouchableOpacity style={{position:'absolute',right:30}} onPress={()=>this.addToCart(i,indx)}>
                                //         <View >
                                //            <Text adjustsFontSizeToFit>Add to Cart</Text>

                                //         </View>
                                //     </TouchableOpacity>}
                                
                                // {(i.def_det.quant!==0) && 
                                // <View style={{height:'100%',width:'40%',position:'absolute',right:30,borderWidth:2,borderColor:"#ccc",flexDirection:"row"}}>
                                //         <TouchableOpacity style={{flex:1}} onPress={()=>this.addToCart(i,indx)}>
                                //         <Icon style={{position:'absolute',right:5}}name="plus" size={20} color="#aaa" />
                                //         </TouchableOpacity>
                                //         <View style={{flex:1,alignItems:"center"}}><Text>{i.def_det.quant}</Text></View>
                                //         <TouchableOpacity style={{flex:1}}  onPress={()=>this.deleteFromCart(i,indx)}>
                                //         <Icon style={{position:'absolute',right:5}}name="minus" size={20} color="#aaa" />
                                //         </TouchableOpacity>

                                //     </View> }


                            
        //             </View>
        //             </View>     
        
        //         </View>
                


        //         )
        //     })
        //   )
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
     height:'20%',position:'absolute',top:'30%',marginHorizontal:'5%',width:'80%', borderWidth:2,borderColor:'#ccc',
 
    },
    id:{
        height:'20%',position:'absolute',top:'30%',marginHorizontal:'5%',width:'80%',
    
       }
 });
 

 const mapStateToProps = state => ({
    cart:state.cart,
    items:state.itemstate,
    token:state.token,
    shop:state.shop
});

const mapDispatchToProps = dispatch => ({
    to_cart:(itemdetails) => dispatch(cart(itemdetails)),
    add_to_cart: (item) => dispatch(addtocart(item)),
    remove_from_cart:(item) => dispatch(removefromcart(item)),
    inc_quant_in_cart:(item)=>dispatch(incquantincart(item)),
    dec_quant_in_cart:(item)=>dispatch(decquantincart(item)),
    refresh_items:(arr)=>dispatch(refreshitems(arr)),
    clear_cart : (id) => dispatch(clearcart(id))
});




export default connect(mapStateToProps, mapDispatchToProps)(StoreItems);

