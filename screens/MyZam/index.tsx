import React from 'react';
import {View} from 'react-native';
import Header from './Header';
import useSort from '../../hooks/useSort';
import {Tab, tabs} from './config';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

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
            <View
              style={{width: '100%', height: 100, backgroundColor: 'orange'}}
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
