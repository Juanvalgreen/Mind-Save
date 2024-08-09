import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store'; 



import RootNavigator from './navigation/Index';
import { registerRootComponent } from 'expo';

import { LogBox } from 'react-native';



export default function App() { 
LogBox.ignoreAllLogs();
  return (
    
    <Provider store={store} >

      <RootNavigator/>
      

    </Provider>
      // <StatusBar style="auto" />
  )
}; 

registerRootComponent(App);



