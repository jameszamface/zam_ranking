import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import MyZam from '../screens/MyZam';
import Ranking from '../screens/Ranking';
import Trend from '../screens/Trend';
import ZamFeed from '../screens/ZamFeed';

type BottomTabParamList = {
  Home: undefined;
  Trend: undefined;
  Ranking: undefined;
  ZamFeed: undefined;
  MyZam: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trend" component={Trend} />
      <Tab.Screen name="Ranking" component={Ranking} />
      <Tab.Screen name="ZamFeed" component={ZamFeed} />
      <Tab.Screen name="MyZam" component={MyZam} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
