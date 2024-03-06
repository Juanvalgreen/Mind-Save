import { StatusBar } from 'expo-status-bar';



import RootNavigator from './navigation/Index';


export default function App() { 
  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  )
}; 

