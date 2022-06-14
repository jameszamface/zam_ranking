import React, {useCallback, useRef} from 'react';
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
import {FlatList, ListRenderItem, ScrollViewProps} from 'react-native';
import Header from './Header';
import {delay} from '../../utils/time';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {StyledComponent} from 'styled-components';

function MyZam() {
  const {top} = useSafeAreaInsets();
  const flatlistRef = useRef<FlatList>(null);
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
    async (tab: Tab) => {
      changeTab(tab);
      await delay(500);
      flatlistRef.current?.scrollToIndex({index: 1});
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

  const renderScrollComponent = useCallback(
    (props: ScrollViewProps) => (
      <Animated.ScrollView {...props} onScroll={scrollHandler} />
    ),
    [scrollHandler],
  );

  return (
    <List
      paddingTop={top}
      ref={flatlistRef}
      ListHeaderComponent={<Header scrollTop={scrollTop} />}
      data={['tab', selectedTab]}
      stickyHeaderIndices={[1]}
      bounces
      scrollEventThrottle={16}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      renderScrollComponent={renderScrollComponent}
    />
  );
}

const List = styled(FlatList)<{paddingTop?: number}>`
  background-color: #ffffff;
  padding-top: ${props => props.paddingTop}px;
` as unknown as StyledComponent<
  typeof FlatList,
  any,
  {
    paddingTop?: number | undefined;
  },
  string
>;

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
