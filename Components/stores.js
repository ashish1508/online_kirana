import React from 'react';
import { StyleSheet, Text, View,Button ,Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken ,addshopid} from '../redux/actions';

const arr=[
    {
        id:1,
        name:"Sri Venkateshwarae",
        lcn:"Kamalanagar",
        dist:"2Km away"
    },
    {
        id:2,
        name:"Sri Venkateshwarae2",
        lcn:"Kamalanagar2",
        dist:"3Km away"
    }
]


class Stores extends React.Component{

    handlePress = (id) =>{
        this.props.add_shop_id(id)
        this.props.nav()
    }

    render(){
    return(
        arr.map(i=>{
        return(
       <TouchableOpacity style={styles.header}  key={i.name} onPress={()=>this.handlePress(i.id)}>
        <View style={{flex:1,flexDirection:"row",backgroundColor:"yellow"}} >
             
                  <Image
                            style={{width:"40%",height:"100%"}}
                            source={require('../Components/sup120.jpg')}
                    />
                    <View style={styles.titleview}>
                        <View style={styles.title}>
                              <Text adjustsFontSizeToFit numberOfLines={1} style={{fontFamily:"PoetsenOne-Regular"}} >{i.name}</Text>
                        </View>
                        <View style={styles.lcn}>
                                <Text adjustsFontSizeToFit numberOfLines={1} style={{fontFamily:"PoetsenOne-Regular"}} >{i.lcn}</Text>
                        </View>
                        <View style={styles.dist}>
                                <Text adjustsFontSizeToFit style={{fontFamily:"OpenSans-Italic"}} >{i.dist}</Text>
                        </View>
                    </View>
         </View>
         </TouchableOpacity>
         
        )})
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
    token: state.token,
    id:state.shop_id
});

const mapDispatchToProps = dispatch => ({
    add_shop_id : (id)=>dispatch(addshopid(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Stores);