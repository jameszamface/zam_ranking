import React, {useCallback} from 'react';
import Header from './Header';
import useSort from '../../hooks/useSort';
import {Tab, tabs, tabLabels} from './config';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Tabs from './Tabs';
import Activity from './TabList/Activity';
import Feed from './TabList/Feed';
import Review from './TabList/Review';
import {ListRenderItem} from 'react-native';

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

  const renderItem: ListRenderItem<string> = useCallback(
    ({item}) => {
      if (item === 'tab') {
        return (
          <Tabs
            key="tab"
            tabs={tabs}
            selectedTab={selectedTab}
            tabLabels={tabLabels}
            onPress={onTabPressed}
          />
        );
      }

      const tab = item as Tab;
      return fetchList(tab);
    },
    [onTabPressed, selectedTab],
  );

  return (
    <Animated.FlatList
      ListHeaderComponent={<Header scrollTop={scrollTop} />}
      data={['tab', selectedTab]}
      stickyHeaderIndices={[1]}
      bounces
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

const fetchList = (tab: Tab) => {
  if (tab === 'activity') {
    return <Activity key="activity" />;
  }
  if (tab === 'feed') {
    return <Feed key="feed" />;
  }
  if (tab === 'review') {
    return <Review key="review" />;
  }

  return null;
};

export default MyZam;
