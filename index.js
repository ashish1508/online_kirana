/**
 * @format
 */
import React from 'react'
import {AppRegistry,AppState} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './redux/store';
class Rapp extends React.Component{

    

    render = ()=>{
        return(
            <Provider store={store}>
                <App/>
            
            </Provider>
        )
    }
}
AppRegistry.registerComponent(appName, () => Rapp);
