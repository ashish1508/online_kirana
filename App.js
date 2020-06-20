
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
  AppState
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
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { getUserToken ,saveUserCart,getUserCart} from './redux/actions';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeView(){
 return ( 
          <Stack.Navigator
          screenOptions={{
            headerShown:false
          }}>
            <Stack.Screen name="Stores" component={StoresView} options={{ title: 'Stores' }} />
            <Stack.Screen name="Categories" component={CategoriesView} options={{ title: 'Categories' }} />
            <Stack.Screen name="Items" component={ItemsView} options={{ title: 'Items' }} />
          </Stack.Navigator>
        )
}
function TabView(){
  return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                      iconName = focused
                        ? 'antdesign'
                        : 'antdesign';
                    } else if (route.name === 'Cart') {
                      iconName = focused ? 'shoppingcart' : 'shoppingcart';
                    }
                    else if (route.name === 'Profile') {
                      iconName = focused ? 'user' : 'user';
                    }
        
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: '#f9ed32',
                  inactiveTintColor: 'gray',
                 
                  
                }}
            >
              <Tab.Screen name="Home" component={HomeView}/>
              <Tab.Screen name="Cart" component={CartView} options={{ title: 'Cart' }} />
              <Tab.Screen name="Profile" component={ProfileView} options={{ title: 'Profile' }} />
            </Tab.Navigator>
          )

}



 class App extends React.Component {



  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      AppState.addEventListener('change', this._handleAppStateChange);
      console.log(this.state.appState)

      
      this._bootstrapAsync(); 
  }

  componentWillUnmount() {

    console.log("app.js unmount  cart : ")
    console.log(this.props.cart)
    this.props.save_User_Cart(this.props.cart)
  }

  _handleAppStateChange = (nextAppState) => {
    

    this.setState({ appState: nextAppState });

    if (nextAppState === 'background') {
 
      // Do something here on app background.
      console.log("App is in Background Mode.")
      console.log("app.js background  cart : ")
      console.log(this.props.cart)
      this.props.save_User_Cart(this.props.cart)

    }
 
    if (nextAppState === 'active') {
 
      // Do something here on app active foreground mode.
      console.log("App is in Active Foreground Mode.")
    }
 
    if (nextAppState === 'inactive') {
 
      // Do something here on app inactive mode.
      console.log("App is in inactive Mode.")
    }
  }

  _bootstrapAsync = () => {

    this.props.getUserToken()
    .then(() => {
          this.props.getUserCart()
          .then(()=>{
            SplashScreen.hide();
          })
          .catch(error => {
            this.setState({ error })
        })
    })
    .catch(error => {
      console.log("heyyyy")
        this.setState({ error })
    })

  };





  
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
  cart:state.cart
});


const mapDispatchToProps = dispatch => ({
  getUserToken: () => dispatch(getUserToken()),
  save_User_Cart : (cart)=>dispatch(saveUserCart(cart)),
  getUserCart : () => dispatch(getUserCart())
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

