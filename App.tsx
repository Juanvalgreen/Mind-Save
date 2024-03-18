import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store'; 



import RootNavigator from './navigation/Index';


export default function App() { 

  return (
    
    <Provider store={store}>

      <RootNavigator/>
      

    </Provider>
      // <StatusBar style="auto" />
  )
}; 

