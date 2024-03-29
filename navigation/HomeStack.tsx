import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectEvaluatorScreen from '../screens/SelectEvaluatorScreen';
import InfoScreen from '../screens/InfoScreen';
import InitScreen from '../screens/InitScreen';
import NameInputScreen from '../screens/DemographicQuestions/NameInputScreen';
import BirthInputScreen from '../screens/DemographicQuestions/BirthInputScreen';
import CanReadScreen from '../screens/DemographicQuestions/CanReadScreen';
import CanWriteScreen from '../screens/DemographicQuestions/CanWriteScreen';
import ProfessionInputScreen from '../screens/DemographicQuestions/ProfessionInputScreen';
import YearQuestionScreen from '../screens/TemporalOrientation/YearQuestionScreen';
import HourQuestionScreen from '../screens/TemporalOrientation/HourQuestionScreen';
import MonthQuestionScreen from '../screens/TemporalOrientation/MonthQuestionScreen';
import MonthDayQuestionScreen from '../screens/TemporalOrientation/MonthDayQuestionScreen';
import WeekDayQuestionScreen from '../screens/TemporalOrientation/WeekDayQuestionScreen';
import CountryQuestionScreen from '../screens/SpacialOrientation/CountryQuestionScreen';
import DeparmentQuestionScreen from '../screens/SpacialOrientation/DeparmentQuestionScreen';
import CityQuestionScreen from '../screens/SpacialOrientation/CityQuestionScreen';



const HomeStack = createNativeStackNavigator();

export default function HomeStackNavigator () {
  return (
    <HomeStack.Navigator >

      <HomeStack.Screen name="Home" component={InitScreen} options={{headerShown: false}} />  
      <HomeStack.Screen name="SelectEvaluator" component={SelectEvaluatorScreen} options={{headerShown: false}} />
      <HomeStack.Screen name="InfoScreen" component={InfoScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="NameInputScreen" component={NameInputScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="BirthInputScreen" component={BirthInputScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="CanReadScreen" component={CanReadScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="CanWriteScreen" component={CanWriteScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="ProfessionInputScreen" component={ProfessionInputScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="YearQuestionScreen" component={YearQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="HourQuestionScreen" component={HourQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="MonthQuestionScreen" component={MonthQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="MonthDayQuestionScreen" component={MonthDayQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="WeekDayQuestionScreen" component={WeekDayQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="CountryQuestionScreen" component={CountryQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="DeparmentQuestionScreen" component={DeparmentQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="CityQuestionScreen" component={CityQuestionScreen} options={{headerShown: false}}/>



    </HomeStack.Navigator>
  );
};

