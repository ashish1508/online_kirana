import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity,FlatList,ActivityIndicator,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';
import StoreItems from '../Components/storeItems'
import Stores from '../Components/stores'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

class CategoriesView extends React.Component {
    
    state={
        data:[],
        page: 1,
        loading: false,
    }

    fetchData = async () => {
        this.setState({ loading: true });
        console.log("fetching page : "+this.state.page)
        // console.log(this.props.token)
        
        //console.log(this.props.token.token)
        const response = await fetch('https://grocee.thenomadic.ninja/api/get_categories', {
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
        //   console.log("-------")
        //  console.log(json)
          
              this.setState(state => ({
                data: [...state.data, ...json.categories],
                loading: false
              }));

      };

    componentDidMount(){
        console.log("categories mounted: ")
        this.fetchData();
    }

   defaultlistbackground = ()=>{
    return (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Loading elements.....</Text></View>)
    }

    handleEnd = () => {
        console.log("handle end")
        if(this.state.page<4)
        this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    };


   render() {
            return (
                
                <View>

                <FlatList
                data={this.state.data}
                style={{backgroundColor:"#ccc"}}
                numColumns={3}
                keyExtractor={(x, i) => i.toString()}
                ListHeaderComponent={
                    <>
                    <View style={{width:"100%",aspectRatio:1.2,backgroundColor:"white"}}>
                      <TouchableOpacity style={{position:"absolute",top:0,left:0,margin:"2%"}} onPress={()=>this.props.navigation.navigate("Stores")}>
                           <Icon style={{fontSize:width*0.1}}  name="arrowleft" color="#f9ed32" />
                      </TouchableOpacity>
                        <View style={{width:"50%",marginHorizontal:"25%",marginVertical:"2%",aspectRatio:1}}>
                            <Image
                                    style={{borderRadius:10,margin:"2%",flex:1}}
                                    // source={require('../Components/sup120.jpg')}
                                    source = {{uri:this.props.shop.img}}
                                    resizeMode={"cover"}
                            />

                        </View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:20,fontFamily:"PoetsenOne-Regular"}} allowFontScaling={false}>{this.props.shop.name+".."}</Text>
                        </View>
                        {/* <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                                <Icon style={{fontSize:(width*0.50)/7,margin:"2%"}}  name="heart"  color="red" />
                        </View> */}
                        <View style={{flex:1,backgroundColor:"#fffd8d",margin:"2%",borderRadius:2,borderColor:"yellow",borderWidth:3,justifyContent:"center",alignItems:"center"}}>
                                <Text style={{fontFamily:"OpenSans-Light"}}>SHOP BY CATEGORY</Text>
                        </View>                        
                    </View>
                     
                    </>}
                // onEndReached={() => this.handleEnd()}
                // onEndReachedThreshold={0.3}
                ListEmptyComponent = {()=>this.defaultlistbackground()}
                // ListFooterComponent={() =>
                //   this.state.loading
                //     ? <ActivityIndicator size="large" animating />
                //     : null}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.bg} onPress={()=>this.props.navigation.navigate("Items")} >
                        <Image
                            style={{width:"100%",height:"85%"}}
                           // source={require('../Components/sup120.jpg')}
                            source = {{uri:item.image}}
                        />
                        <View style={{width:"100%",height:"15%",alignItems:"center"}}>
                            <Text allowFontScaling={false} adjustsFontSizeToFit >{item.name}</Text>
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
        width:"32%",
        aspectRatio:0.8,
        backgroundColor:"white",
        marginLeft:"1%",
        marginBottom:"1%"
   },
   touchopa:{
    flex:1,
    marginHorizontal:"3%",
    backgroundColor:"red"
   }
});

const mapStateToProps = state => ({
    token: state.token,
    shop:state.shop
});

const mapDispatchToProps = dispatch => ({
    removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesView);