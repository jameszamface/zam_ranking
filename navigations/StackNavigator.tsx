import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Dummy from '../screens/Dummy';
import { headerOptions } from '../screens/Ranking/config';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="Dummy" component={Dummy} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
