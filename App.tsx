/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import BottomTabs from './navigations/BottomTabs';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TutorialProvider from './contexts/TutorialContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <TutorialProvider>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
        </TutorialProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
