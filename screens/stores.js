import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken ,addshopid} from '../redux/actions';
import StoreItems from '../Components/storeItems'
import Stores from '../Components/stores'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';


class StoresView extends React.Component {

    state={
        data:[],
        page: 1,
        loading: false,
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
        
        //console.log(this.props.token.token)
        const response = await fetch('http://grocee.thenomadic.ninja/api/get_shops', {
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
          const json = await response.json()
          console.log("-------")
          console.log(json)
          
              this.setState(state => ({
                data: [...state.data, ...json.shops],
                loading: false
              }));

      };

    componentDidMount(){
        console.log("stores mounted: ")
        this.fetchData();
    }

    handleEnd = () => {
        console.log("handle end")
        if(this.state.page<4)
        this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    };


    defaultlistbackground = ()=>{
        return (<View><Text>No elements</Text></View>)
    }

    handlePress = (id) =>{
        this.props.add_shop_id(id)
        this.props.navigation.navigate("Categories")
    }

   render() {
       
            return (
                <View style = {styles.container}>
                    <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
                    <Button title="Categories" onPress={()=>this.props.navigation.navigate("Categories")}/>
                     <Text>{this.props.redux.cart.length}</Text>
                     {/* <Stores nav = {()=>this.props.navigation.navigate("Categories")}/>   */}
                     <FlatList
                        data={this.state.data}
                        style={{backgroundColor:"#ccc"}}
                        keyExtractor={(x, i) => i.toString()}
                        onEndReached={() => this.handleEnd()}
                        onEndReachedThreshold={0.3}
                        ListEmptyComponent = {()=>this.defaultlistbackground()}
                        ListFooterComponent={() =>
                          this.state.loading
                            ? <ActivityIndicator size="large" animating />
                            : null}
                        renderItem={({ item }) =>
                        <TouchableOpacity style={styles.header} onPress={()=>this.handlePress(item.shop_id)}>
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

                </View>
            )

   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ccc',
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
    aspectRatio:3,
    borderRadius:5,
    borderWidth:3,
    borderColor:"#ccc",
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

});

const mapStateToProps = state => ({
    redux:state,
    token:state.token
});

const mapDispatchToProps = dispatch => ({
    add_shop_id : (id)=>dispatch(addshopid(id)),
    removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoresView);