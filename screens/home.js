import React from 'react';
import { StyleSheet, Text, View,Button,ActivityIndicator,FlatList,SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';
import { ListItem } from "react-native-elements";
class HomeView extends React.Component {

    state = {
        data: [],
        // data3:[{name:"äshish"}],
        page: 1,
        loading: false,
        //hasnext:true
      };

    _signOutAsync =  () => {
        this.props.removeUserToken()
            .then(() => {
                this.props.navigation.navigate('Login');
            })
            .catch(error => {
                this.setState({ error })
            })
    };
    componentDidMount() {
        console.log("home mounted: ")
        this.fetchData();
      }
    // componentDidMount(){
    //     console.log('home'+this.props.token.token)
    // }
    // fetchData = async () => {
    //     console.log("fetching page"+this.state.page)
    //     this.setState({ loading: true });
    //     const response = await fetch(
    //       `https://randomuser.me/api?results=5&seed=hi&page=${this.state.page}`
    //     );
    //     const json = await response.json();
    //     this.setState(state => ({
    //       data: [...state.data, ...json.results],
    //       loading: false
    //     }));
    //     console.log("")
    //   };

    
    
      fetchData = async () => {
        this.setState({ loading: true });
        console.log("fetching page : "+this.state.page)
        
        //console.log(this.props.token.token)
        const response = await fetch('http://1c2907eb.ngrok.io/api/get_shops', {
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
          const json = await response.json();
              this.setState(state => ({
                data: [...state.data, ...json.shops],
                loading: false
              }));

      };

    //   handleEnd = () => {
    //       console.log("handleend : "+this.state.hasnext)
    //     if(this.state.hasnext === true){
    //     console.log("hey")
    //     this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    //     }else{
            
    //     }
    //   };

    handleEnd = () => {
        console.log("handle end")
        if(this.state.page<4)
        this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
      };
    defaultlistbackground = ()=>{
        return (<View><Text>No elements</Text></View>)
    }

    // render() {
    //     return (
    //         <View>
                
    //             <FlatList
    //                 data={this.state.data}
    //                 keyExtractor={(x, i) => i.toString()}
    //                 onEndReached={() => this.handleEnd()}
    //                 onEndReachedThreshold={0.3}
    //                 ListFooterComponent={() =>
    //                 this.state.loading
    //                     ? null
    //                     : <ActivityIndicator size="large" animating />}
    //                 renderItem={({ item }) =>
    //                 <ListItem
    //                     roundAvatar
    //                     leftAvatar={{ source:{uri: item.picture.thumbnail }}}
    //                     title={`${item.name.first} ${item.name.last}`}
    //                     containerStyle={{backgroundColor:"yellow"}}
    //                 />}
    //             />
                
    //         </View>
    //     );
    //   }
    
      render() {
          
        //   if( this.state.page==0){
            
        //      return <View/>
        //   }
          console.log("rendering : " )
          console.log(this.state)
    
        return (
        <SafeAreaView>
          <View>
          <Button title="I'm done, sign me out" onPress={this._signOutAsync}/>
          <Button title="Go To Checkout" onPress={()=>this.props.navigation.navigate("Checkout")} />
              <FlatList
                data={this.state.data}
                keyExtractor={(x, i) => i.toString()}
                onEndReached={() => this.handleEnd()}
                onEndReachedThreshold={0.1}
                ListEmptyComponent = {()=>this.defaultlistbackground()}
                ListFooterComponent={() =>
                  this.state.loading
                    ? <ActivityIndicator size="large" animating />
                    : null}
                renderItem={({ item }) =>
                  <ListItem
                    roundAvatar
                    containerStyle={{aspectRatio:1}}
                   //leftAvatar={{source:{ uri: item.picture.thumbnail }}}
                    title={item.name}
                  />}
              />
          </View>
        </SafeAreaView>
        );
      }

//    render() {
     
//      //this.fetchData()
//             return (
//                 <SafeAreaView>
//                 <View >
                
//                      {this.props.token.token!==null &&  />}
//                      <Button title="I'm done, sign me out" onPress={this._signOutAsync}/>
//                     <Button title="Go To Checkout" onPress={()=>this.props.navigation.navigate("Checkout")} />
//                     <FlatList
//                    // style={{backgroundColor:"blue"}}
//                     data={this.state.data3}
//                     keyExtractor={(x, i) => i.toString()}
//                     onEndReached={() => this.handleEnd()}
//                     onEndReachedThreshold={1}
//                     ListFooterComponent={() =>
//                     this.state.loading === false
//                         ? null
//                         : <ActivityIndicator size="large" animating />}
//                     renderItem={({ item }) =>
//                     <ListItem
//                         title={item.name}
//                         containerStyle={{backgroundColor:"yellow",aspectRatio:1}}
//                     />}
//                 />
                   
//                 </View>
//                 </SafeAreaView>
            
//             )
//    }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

const mapStateToProps = state => ({
    token: state.token,
});

const mapDispatchToProps = dispatch => ({
    removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);