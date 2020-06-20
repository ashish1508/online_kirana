import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity,FlatList,ActivityIndicator,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken ,addshopdetails} from '../redux/actions';
import StoreItems from '../Components/storeItems'
import Stores from '../Components/stores'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';
import ContentLoader from 'react-native-content-loader'
import {Circle, Rect} from 'react-native-svg'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { TextInput } from 'react-native-gesture-handler';

let width= Dimensions.get('window').width
let height= Dimensions.get('window').height
// loadingComp = () => {
//     return(       
        
//     <ContentLoader height={300} duration={1000} >
//         <Circle cx="30" cy="30" r="30" />
//         <Rect x="75" y="13" rx="4" ry="4" width="100" height="13"/>
//         <Rect x="75" y="37" rx="4" ry="4" width="50" height="8"/>
//         <Rect x="0" y="70" rx="5" ry="5" width="400" height="200"/>
//     </ContentLoader>
    
//     )
// }

class StoresView extends React.Component {

    state={
        data:[],
        page: 1,
        loading: false,
        next:false
    }

    _signOutAsync =  () => {
        this.props.removeUserToken()
            .then(() => {
            
            })
            .catch(error => {
                this.setState({ error })
            })
    };

    fetchData = async () => {
        this.setState({ loading: true });
        console.log("fetching page : "+this.state.page)
        console.log(this.props.token)
        
       // console.log(this.props.token.token)
        const response = await fetch('https://grocee.thenomadic.ninja/api/get_shops', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token:this.props.token.token,
              page: this.state.page,
            }),
          })
          console.log(response.status)
          if(response.status===401){
              this._signOutAsync()
          }
         
          const json = await response.json()
          console.log("-------")
          console.log(json)
          
              this.setState(state => ({
                data: [...state.data, ...json.shops],
                next:json.has_next,
                loading: false
              }));

      };

    componentDidMount(){
        console.log("stores mounted: ")
         this.fetchData();
    }

    handleEnd = () => {
        console.log("handle end")
        if(this.state.next)
        this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
        
    };


    defaultlistbackground = ()=>{
        return (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Loading elements....</Text></View>)
    }

    handlePress = (name,id,img) =>{
        // this._signOutAsync()
        let details={name:name,id:id,img:img}
        console.log(details)
        this.props.add_shop_details(details)
        this.props.navigation.navigate("Categories")
    }

   render() {
       
            if(this.state.data.length<3){
                console.log(width)
                return(
                    
                    Array.from({length: height/(0.3*width)}).map((_, index) => (
                        <View key={index} style={{marginTop:"2%"}}>
                          <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item width={0.98*width} aspectRatio={2.5} flexDirection="row" marginHorizontal="4%">
                             <SkeletonPlaceholder.Item width={0.3*width} aspectRatio={1}/>
                             <SkeletonPlaceholder.Item
                                flex={1}
                             
                                marginLeft={0.05*width}>
                                <SkeletonPlaceholder.Item
                                width="50%"
                                aspectRatio={5}
                                borderRadius={6}
                                />
                                <SkeletonPlaceholder.Item
                                width="30%"
                                marginTop="10%"
                                aspectRatio={5}
                                borderRadius={6}
                                />
                       
                            </SkeletonPlaceholder.Item>
                              
                            </SkeletonPlaceholder.Item>
                          </SkeletonPlaceholder>
                        </View>
                      ))
                  )
            }
       
            return (

                <View style = {styles.container}>
                    
                    <View style={{width:"100%",aspectRatio:3.3,backgroundColor:"#f9ed32"}}>

                        <View style={{flexDirection:"row",width:"98%",marginTop:"2%",marginHorizontal:"1%",aspectRatio:7}}>
                            <View style={{flex:6,justifyContent:"center"}}>
                                <Text style={{marginLeft:"5%",fontFamily:"Acme-Regular",fontSize:20}} adjustsFontSizeToFit>Online Kirana</Text>
                            </View>
                            <View style={{flex:2,alignItems:"center",justifyContent:"center"}}>
                            <Icon style={{fontSize:(width*0.50)/7,margin:"2%"}}  name="shoppingcart"  color="black" />
                            </View>
                            <View style={{flex:2,alignItems:"center",justifyContent:"center"}}>
                            <Icon style={{fontSize:(width*0.50)/7,margin:"2%"}}  name="user"  color="black" />
                            </View>
                            
                        </View>

                        
                        <View style={{width:"96%",aspectRatio:9,margin:"2%",backgroundColor:"white",flexDirection:"row"}}>
                            
                                <Icon style={{fontSize:(width*0.50)/9,margin:"2%"}}  name="search1"  color="#aaa" />
                                <TextInput 
                                style={{flex:1}} 
                                allowFontScaling={false}
                                placeholder={"Search for shops"}
                                placeholderTextColor={"#aaa"}/>
                            

                        </View>

                    </View>

                     <FlatList
                        data={this.state.data}
                        style={{backgroundColor:"#e2e3da"}}
                        keyExtractor={(x, i) => i.toString()}
                        onEndReached={() => this.handleEnd()}
                        onEndReachedThreshold={0.3}
                        ListEmptyComponent = {()=>this.defaultlistbackground()}
                        ListFooterComponent={() =>
                          this.state.loading
                            ? <ActivityIndicator size="large" animating />
                            : null}
                        renderItem={({ item }) =>
                        <TouchableOpacity style={styles.header} onPress={()=>this.handlePress(item.name,item.shop_id,item.image)}>
                        <View style={{flex:1,flexDirection:"row",backgroundColor:"white",justifyContent:"center",alignItems:"center"}} >
                             
                                  <Image
                                            style={{width:"30%",height:"75%",borderRadius:10,marginRight:"2%"}}
                                           // source={require('../Components/sup120.jpg')}
                                           source = {{uri:item.image}}
                                    />
                                    <View style={styles.titleview}>
                                        <View style={styles.title}>
                                            <Text adjustsFontSizeToFit numberOfLines={1} style={{fontFamily:"PoetsenOne-Regular"}} >{item.name}</Text>
                                        </View>
                                        <View style={styles.lcn}>
                                            <Text adjustsFontSizeToFit numberOfLines={1} style={{fontFamily:"PoetsenOne-Regular"}} >{item.shop_id}</Text>
                                        </View>
                                        {/* <View style={styles.dist}>
                                             <Text adjustsFontSizeToFit style={{fontFamily:"OpenSans-Italic"}} >{item.dist}</Text>
                                        </View> */}
                                    </View>
                         </View>
                         </TouchableOpacity>
                        }
                    />
                 {this.props.cart.length>0 &&
                <View style={styles.cart}>

                </View>}
                </View>
               
            )

   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
   },
   bg:{
    width:"98%",
    aspectRatio:0.8,
    backgroundColor:"yellow",
    marginLeft:"1%",
    marginBottom:"1%"
},

header:{
         
    backgroundColor:"white",
    width:"98%",
    marginHorizontal:"1%",
    aspectRatio:2.5,
    borderRadius:5,
    borderWidth:1,
    borderColor:"#e2e3da",
    //marginBottom:"1%"
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
top:"45%",
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
    redux:state,
    token:state.token,
    cart:state.cart
});

const mapDispatchToProps = dispatch => ({
    add_shop_details : (details)=>dispatch(addshopdetails(details)),
    removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoresView);