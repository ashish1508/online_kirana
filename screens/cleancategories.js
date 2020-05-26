import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity,FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';
import StoreItems from '../Components/storeItems'
import Stores from '../Components/stores'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign';


class CategoriesView extends React.Component {
    
   state={
       data:[{id:1,name:"cat1"},{id:2,name:"cat2"},{id:3,name:"cat3"},{id:4,name:"cat4"},{id:5,name:"cat5"}]
   }

   defaultlistbackground = ()=>{
    return (<View><Text>No elements</Text></View>)
    }


   render() {
            return (
                <View style = {styles.container}>
                <Button title="Items" onPress={()=>this.props.navigation.navigate("Items")}/>
                <Text>{this.props.id}</Text>
                <Text>Ashish</Text>
                <FlatList
                data={this.state.data}
                style={{backgroundColor:"pink"}}
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
                            style={{width:"100%",height:"89%"}}
                            source={require('../Components/sup120.jpg')}
                        />
                            <Text>{item.name}</Text>
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