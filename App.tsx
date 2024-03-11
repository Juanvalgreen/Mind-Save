import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; 



import RootNavigator from './navigation/Index';


export default function App() { 

  return (

    <Provider store={store}>

      <RootNavigator />
    </Provider>
      // <StatusBar style="auto" />
  )
}; 

