import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectEvaluatorScreen from '../screens/SelectEvaluatorScreen';
import InfoScreen from '../screens/InfoScreen';
import InitScreen from '../screens/InitScreen';
import NameInputScreen from '../screens/DemographicQuestions/NameInputScreen';
import BirthInputScreen from '../screens/DemographicQuestions/BirthInputScreen';



const HomeStack = createNativeStackNavigator();

export default function HomeStackNavigator () {
  return (
    <HomeStack.Navigator >

      <HomeStack.Screen name="Home" component={InitScreen} options={{headerShown: false}} />  
      <HomeStack.Screen name="SelectEvaluator" component={SelectEvaluatorScreen} options={{headerShown: false}} />
      <HomeStack.Screen name="InfoScreen" component={InfoScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="NameInputScreen" component={NameInputScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="BirthInputScreen" component={BirthInputScreen} options={{headerShown: false}}/>

    </HomeStack.Navigator>
  );
};

