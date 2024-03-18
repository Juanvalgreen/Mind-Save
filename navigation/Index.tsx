import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from './HomeStack';
import { useSelector } from 'react-redux';
import { GlobalState } from '../types/types';
import ProgressBar from '../components/ProgressBar';

const RootNavigator = () => {

  const totalProgress = useSelector((state: GlobalState) => state.totalProgress)


  return (
    <>
      <NavigationContainer>
        <HomeStackNavigator />
        {totalProgress === 0 ? null : <ProgressBar></ProgressBar>}
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;