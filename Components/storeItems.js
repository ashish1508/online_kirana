import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken,addtocart,removefromcart,incquantincart,decquantincart,refreshitems } from '../redux/actions';

import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';




class StoreItems extends React.Component{ 
    
    state = {
        isModalVisible: false,
        arr2:this.props.items,
        model:{
            details:[],
            pointer:-1
        },
        cart:[]
      };
     
    componentDidMount(){
    
    }

    componentWillUnmount(){
        console.log("unmount")
        this.props.refresh_items(this.state.arr2)
    }
    toggleModal2=()=>{
        this.setState({isModalVisible:!this.state.isModalVisible})
    }

    toggleModal = (ind) => {
        let new_m={
            ...this.state.model
        }
        new_m.details=this.state.arr2[ind].details
        new_m.pointer=ind
        this.setState({isModalVisible: !this.state.isModalVisible,model:new_m});
      };

    changeHandler=(q,p,quant,index)=>{
        const new_ar=[
            ...this.state.arr2
        ]
        new_ar[index].def_det={qu:q,pri:p,quant:quant}
        this.setState({arr2:new_ar},()=>{
        this.toggleModal2()
        })
    }
    addToCart = (item,indx)=>{
        if(item.def_det.quant===0){
            let newitem={
                name:item.name,
                qu:item.def_det.qu,
                pri:item.def_det.pri,
                quant:1
            }

            newcart = [...this.state.cart ,newitem]
            this.props.add_to_cart(item)
            newarr2 = this.state.arr2
            newarr2[indx].def_det.quant+=1
            let j;
            let det=newarr2[indx].details
            for(j=0;j<det.length;j++){
                if(newarr2[indx].name===item.name && newarr2[indx].details[j].qu === item.def_det.qu){
                    newarr2[indx].details[j].quant = 1
                    // console.log("local cart : ")
                    // console.log(newcart)
                    this.setState({arr2:newarr2,cart:newcart})
                    break
                }
            }
        }
        else if(item.def_det.quant < 4){
            newcart = this.state.cart
            let i
            this.props.inc_quant_in_cart(item)
            for(i=0;i<newcart.length;i++){
                
                if(newcart[i].name === item.name &&  newcart[i].qu === item.def_det.qu){
                    let newitem = {
                        name:item.name,
                        qu:item.def_det.qu,
                        pri:item.def_det.pri,
                        quant:item.def_det.quant + 1

                    }
                    newcart[i]=newitem
                    newarr2 = this.state.arr2
                    newarr2[indx].def_det.quant +=1
                    
                    let j;
                    for(j=0;j<newarr2[indx].details.length;j++){
                        if( newarr2[indx].details[j].qu === item.def_det.qu){
                            newarr2[indx].details[j].quant += 1
                            // console.log("local cart : ")
                            // console.log(newcart)
                            this.setState({arr2:newarr2,cart:newcart})
                            break
                        }
                    }
                    break
                }
            }
        }
       // console.log("arr2 : ")
       // console.log(this.state.arr2[indx])

    }

    deleteFromCart=(item,indx)=>{
        
        if(item.def_det.quant===1){
            this.props.remove_from_cart(item)
            let new_cart=this.state.cart.filter(it =>{
                return (it.name!==item.name || it.qu!==item.def_det.qu)
            })
            //newcart = [...this.state.cart ,newitem]
            console.log("newcart :")
            console.log(newcart)
            newarr2 = [...this.state.arr2]
            newarr2[indx].def_det.quant-=1
            let j;
            let det=newarr2[indx].details
            for(j=0;j<det.length;j++){
                if(newarr2[indx].name === item.name && newarr2[indx].details[j].qu === item.def_det.qu){
                    newarr2[indx].details[j].quant = 0
                    this.setState({arr2:newarr2,cart:new_cart})
                    break
                }
            }
        }
        else{
            newcart = [...this.state.cart]
            this.props.dec_quant_in_cart(item)
            let i;
            for(i=0;i<newcart.length;i++){
                
                if(newcart[i].name === item.name &&  newcart[i].qu === item.def_det.qu){
                    let newitem = {
                        name:item.name,
                        qu:item.def_det.qu,
                        pri:item.def_det.pri,
                        quant:item.def_det.quant - 1

                    }
                    newcart[i]=newitem
                    newarr2 = [...this.state.arr2]
                    newarr2[indx].def_det.quant -=1
                    
                    let j;
                    for(j=0;j<newarr2[indx].details.length;j++){
                        if( newarr2[indx].details[j].qu === item.def_det.qu){
                            newarr2[indx].details[j].quant -= 1
                            
                            this.setState({arr2:newarr2,cart:newcart})
                            break
                        }
                    }
                    break
                }
            }
        }
       // console.log("arr2 : ")
       // console.log(this.state.arr2[indx])

    }

      render(){
          console.log("cart: ")
          console.log(this.state.cart)
          console.log("global cart")
          console.log(this.props.cart)
          
          return(
            this.state.arr2.map((i,indx) =>{
                
                return (
                
                <View style={styles.header} key={i.name}>
                    <Image
                        style={{width:"40%",height:"100%"}}
                        source={require('../Components/sup120.jpg')}
                    />
                    <View style={styles.titleview}>
                    <View style={styles.title}>
                         <Text adjustsFontSizeToFit numberOfLines={1} style={{fontFamily:"PoetsenOne-Regular"}} >{i.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.dropdown} onPress={()=>this.toggleModal(indx)}>
                            <View  style={{flexDirection:'row'}}>
                                    <Text>{i.def_det.qu}</Text>
                                <Icon style={{position:'absolute',right:5}}name="down" size={20} color="#aaa" />

                            </View>
                    </TouchableOpacity>


                    <View style={{position:'absolute', top:'60%', height:"20%",marginHorizontal:'5%', flexDirection:'row', width:'100%'}}>
                                <Text adjustsFontSizeToFit>MRP {i.def_det.pri}</Text>

                                {(i.def_det.quant===0) && 
                                <TouchableOpacity style={{position:'absolute',right:30}} onPress={()=>this.addToCart(i,indx)}>
                                        <View >
                                           <Text adjustsFontSizeToFit>Add to Cart</Text>

                                        </View>
                                    </TouchableOpacity>}
                                
                                {(i.def_det.quant!==0) && 
                                <View style={{height:'100%',width:'40%',position:'absolute',right:30,borderWidth:2,borderColor:"#ccc",flexDirection:"row"}}>
                                        <TouchableOpacity style={{flex:1}} onPress={()=>this.addToCart(i,indx)}>
                                        <Icon style={{position:'absolute',right:5}}name="plus" size={20} color="#aaa" />
                                        </TouchableOpacity>
                                        <View style={{flex:1,alignItems:"center"}}><Text>{i.def_det.quant}</Text></View>
                                        <TouchableOpacity style={{flex:1}}  onPress={()=>this.deleteFromCart(i,indx)}>
                                        <Icon style={{position:'absolute',right:5}}name="minus" size={20} color="#aaa" />
                                        </TouchableOpacity>

                                    </View> }


                            
                    </View>
                    </View>

                                                
                        <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({isModalVisible: false})}>
                              <View style={{width:'100%', height:'30%', justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
                                    {this.state.model.details.map((x) => {
                                        
                                        return(
                                        <TouchableOpacity onPress={()=>this.changeHandler(x.qu,x.pri,x.quant,this.state.model.pointer)} key={x.qu} style={{borderWidth:1,borderColor:'#ccc',marginTop:'5%',justifyContent:'center',width:'100%',flexDirection:'row'}}>  
                                         <View style={{flexDirection:'row'}} >   
                                            <Text style={{marginRight:'2%'}}>Quantity: {x.qu}</Text>
                                            <Text>Price: {x.pri}</Text>
                                        </View>
                                        </TouchableOpacity>
                                        )
                                    })}
                              </View>
                        </Modal>
        
                </View>
                


                )
            })
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
         height:"20%",
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
     marginTop:"8%",
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
 
    }
 });
 

 const mapStateToProps = state => ({
    cart:state.cart,
    items:state.itemstate
});

const mapDispatchToProps = dispatch => ({
    add_to_cart: (item) => dispatch(addtocart(item)),
    remove_from_cart:(item) => dispatch(removefromcart(item)),
    inc_quant_in_cart:(item)=>dispatch(incquantincart(item)),
    dec_quant_in_cart:(item)=>dispatch(decquantincart(item)),
    refresh_items:(arr)=>dispatch(refreshitems(arr))
});




export default connect(mapStateToProps, mapDispatchToProps)(StoreItems);