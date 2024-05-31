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
import WhereQuestionScreen from '../screens/SpacialOrientation/WhereQuestionScreen';
import RepeatWordQuestionScreen from '../screens/FocusQuestions/RepeatWordQuestionScreen';
import MinusSequenceQuestionScreen from '../screens/CalculationQuestions/MinusSequenceQuestionScreen';
import ReverseSpellingQuestionScreen from '../screens/CalculationQuestions/ReverseSpellingQuestionScreen';
import RememberWordsQuestionScreen from '../screens/MemoryQuestions/RememberWordsQuestionScreen';
import ObjectIdentificationIntroScreen from '../screens/LenguageQuestions/ObjectIdentification/ObjectIdentificationIntroScreen';
import ObjectIdentificationPencilScreen from '../screens/LenguageQuestions/ObjectIdentification/ObjectIdentificationPencilScreen';
import ObjectIdentificationClockScreen from '../screens/LenguageQuestions/ObjectIdentification/ObjectIdentificationClockScreen';
import RepeatWordIntroScreen from '../screens/FocusQuestions/RepeatWordQuestionIntroScreen';
import RepeatSentenceQuestionScreen from '../screens/LenguageQuestions/RepeatSentence/RepeatSentenceQuestionScreen';
import RepeatSentenceIntroScreen from '../screens/LenguageQuestions/RepeatSentence/RepeatSentenceIntroScreen';
import ReadInstructionQuestionScreen from '../screens/LenguageQuestions/ReadInstruction/ReadInstructionQuestionScreen';
import ReadInstructionIntroScreen from '../screens/LenguageQuestions/ReadInstruction/ReadInstructionIntroScreen';
import SayInstructionIntroScreen from '../screens/LenguageQuestions/SayInstruction/SayInstructionIntroScreen';
import SayInstructionQuestionScreen from '../screens/LenguageQuestions/SayInstruction/SayInstructionQuestionScreen';
import WriteSencetenceQuestionScreen from '../screens/LenguageQuestions/WriteSencetenceQuestionScreen';



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
      <HomeStack.Screen name="WhereQuestionScreen" component={WhereQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="RepeatWordQuestionScreen" component={RepeatWordQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="RepeatWordIntroScreen" component={RepeatWordIntroScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="MinusSequenceQuestionScreen" component={MinusSequenceQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="ReverseSpellingQuestionScreen" component={ReverseSpellingQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="RememberWordsQuestionScreen" component={RememberWordsQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="ObjectIdentificationPencilScreen" component={ObjectIdentificationPencilScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="ObjectIdentificationClockScreen" component={ObjectIdentificationClockScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="ObjectIdentificationIntroScreen" component={ObjectIdentificationIntroScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="RepeatSentenceIntroScreen" component={RepeatSentenceIntroScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="RepeatSentenceQuestionScreen" component={RepeatSentenceQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="ReadInstructionQuestionScreen" component={ReadInstructionQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="ReadInstructionIntroScreen" component={ReadInstructionIntroScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="SayInstructionIntroScreen" component={SayInstructionIntroScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="SayInstructionQuestionScreen" component={SayInstructionQuestionScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name="WriteSencetenceQuestionScreen" component={WriteSencetenceQuestionScreen} options={{headerShown: false}}/>

    </HomeStack.Navigator>
  );
};

