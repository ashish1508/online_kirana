import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';
import StoreItems from '../Components/storeItems'
import Stores from '../Components/stores'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';


class CategoriesView extends React.Component {
    
    state={
        data:[],
        page: 1,
        loading: false,
    }

    fetchData = async () => {
        this.setState({ loading: true });
        console.log("fetching page : "+this.state.page)
        console.log(this.props.token)
        
        //console.log(this.props.token.token)
        const response = await fetch('http://grocee.thenomadic.ninja/api/get_categories', {
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
                data: [...state.data, ...json.categories],
                loading: false
              }));

      };

    componentDidMount(){
        console.log("categories mounted: ")
        this.fetchData();
    }

   defaultlistbackground = ()=>{
    return (<View style={{flex:1}}><Text>No elements</Text></View>)
    }

    handleEnd = () => {
        console.log("handle end")
        if(this.state.page<4)
        this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    };


   render() {
            return (
                <View style = {styles.container}>
                <Button title="Items" onPress={()=>this.props.navigation.navigate("Items")}/>
                <Text>{this.props.id}</Text>
                
                <FlatList
                data={this.state.data}
                style={{backgroundColor:"#ccc"}}
                numColumns={3}
                keyExtractor={(x, i) => i.toString()}
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
                            <Text adjustsFontSizeToFit >{item.name}</Text>
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
        backgroundColor:"yellow",
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
    id:state.shop_id
});

const mapDispatchToProps = dispatch => ({
    removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesView);