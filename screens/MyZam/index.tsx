import React, {useCallback} from 'react';
import {View} from 'react-native';
import Header from './Header';
import useSort from '../../hooks/useSort';
import { Tab, tabs, tabLabels } from './config';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Tabs from './Tabs';

function MyZam() {
  const scrollTop = useSharedValue(0);
  const {sort: selectedTab, changeSort: changeTab} = useSort<Tab>(tabs[0]);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: e => {
        scrollTop.value = e.contentOffset.y;
      },
    },
    [],
  );

  const onTabPressed = useCallback(
    (tab: Tab) => {
      changeTab(tab);
    },
    [changeTab],
  );

  return (
    <Animated.FlatList
      ListHeaderComponent={<Header scrollTop={scrollTop} />}
      data={['tab', selectedTab]}
      stickyHeaderIndices={[1]}
      bounces
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      renderItem={({item}) => {
        if (item === 'tab') {
          return (
            <Tabs
              tabs={tabs}
              selectedTab={selectedTab}
              tabLabels={tabLabels}
              onPress={onTabPressed}
            />
          );
        }

        return (
          <View
            style={{width: '100%', height: 1500, backgroundColor: 'yellow'}}
          />
        );
      }}
    />
  );
}

export default MyZam;
