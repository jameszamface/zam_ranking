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
import {SafeAreaView, StyleSheet} from 'react-native';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
