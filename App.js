
import 'react-native-gesture-handler';
import React,{Fragment,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
} from 'react-native';
import SignupView from './screens/signup.js'
import LoginView  from './screens/login.js' 
//import HomeView from './screens/home.js'
import CheckoutView from './screens/checkout.js'
import CategoriesView from './screens/cleancategories.js'
import StoresView from './screens/stores.js'
import ItemsView from './screens/items.js'
import CartView from './screens/cart.js'
import ProfileView from './screens/profile.js'

import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { connect } from 'react-redux';
import { getUserToken } from './redux/actions';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeView(){
 return ( 
          <Stack.Navigator>
            <Stack.Screen name="Stores" component={StoresView} options={{ title: 'Stores' }} />
            <Stack.Screen name="Categories" component={CategoriesView} options={{ title: 'Categories' }} />
            <Stack.Screen name="Items" component={ItemsView} options={{ title: 'Items' }} />
          </Stack.Navigator>
        )
}
function TabView(){
  return (
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeView}/>
              <Tab.Screen name="Cart" component={CartView} options={{ title: 'Cart' }} />
              <Tab.Screen name="Profile" component={ProfileView} options={{ title: 'Profile' }} />
            </Tab.Navigator>
          )

}



 class App extends React.Component {

  state={
    signedin:false
  }

  _bootstrapAsync = () => {

    this.props.getUserToken().then(() => {
      
      SplashScreen.hide();
        // if(this.props.token.token===null)
        // this.props.navigation.navigate('Login');
        // else{
        //   console.log("HOME SCREEN")
        //   this.props.navigation.navigate('Home');
        // }
    })
        .catch(error => {
            this.setState({ error })
        })

  };



  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      this._bootstrapAsync();
     
      
  }
  render = () => {return (
    
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
      >
        {this.props.token.token==null ? (
        <>
        {/* <Stack.Screen name="Tab" component={TabView}  /> */}
        <Stack.Screen name="Login" component={LoginView} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupView} options={{ title: 'Signup' }} />
        {/* <Stack.Screen name="Stores" component={StoresView} options={{ title: 'Categories' }} />
        <Stack.Screen name="Categories" component={CategoriesView} options={{ title: 'Categories' }} />
        <Stack.Screen name="Items" component={ItemsView} options={{ title: 'Categories' }} /> */}
        </>
        ) : (
        <>
        
        
        <Stack.Screen name="Tab" component={TabView}  />
        
        </>
        )}
         
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}
}

const styles = {
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
};

const mapStateToProps = state => ({
  token: state.token,
});


const mapDispatchToProps = dispatch => ({
  getUserToken: () => dispatch(getUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);




// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

