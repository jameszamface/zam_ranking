import React, {useCallback, useMemo, useRef} from 'react';
import useSort from '../../hooks/useSort';
import {Tab, tabs, tabLabels, tabHeight} from './config';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Tabs from './Tabs';
import Activity from './TabList/Activity';
import Feed from './TabList/Feed';
import Review from './TabList/Review';
import {FlatList, ListRenderItem, View, StyleSheet} from 'react-native';
import Header from './Header';
import {delay} from '../../utils/time';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import useLayout from '../../hooks/useLayout';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';
import SafeTopCover from './SafeTopCover';
import {isIOS} from '../../constants/index';
import {withTutorial} from '../../contexts/TutorialContext';
import {withSuspense} from '../../hooks/withSuspense';

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList,
) as typeof FlatList;

function MyZam() {
  const {top} = useSafeAreaInsets();
  const {layout, onLayout} = useLayout();
  const tabScreenMinHeight = useMemo(
    () => (layout?.height || 0) - top - tabHeight,
    [top, layout],
  );

  const {layout: headerLayout, onLayout: onHeaderLayout} = useLayout();

  const flatlistRef = useRef<FlatList<string>>(null);
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
      await delay(250);
      flatlistRef.current?.scrollToIndex({index: 1, viewOffset: tabHeight});
    },
    [changeTab, flatlistRef],
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
            height={tabHeight}
          />
        );
      }

      const tab = item as Tab;
      const List = fetchList(tab);
      return <List key={selectedTab} minHeight={tabScreenMinHeight} />;
    },
    [onTabPressed, selectedTab, tabScreenMinHeight],
  );

  return (
    <Container onLayout={onLayout}>
      {isIOS && (
        <SafeTopCover
          scrollTop={scrollTop}
          triggerOffset={headerLayout?.height}
        />
      )}
      <AnimatedFlatList
        style={[styles.listStyle, {paddingTop: top}]}
        contentContainerStyle={{paddingBottom: top}}
        ref={flatlistRef}
        onScroll={scrollHandler}
        ListHeaderComponent={
          <Header onLayout={onHeaderLayout} scrollTop={scrollTop} />
        }
        data={['tab', selectedTab]}
        stickyHeaderIndices={[1]}
        bounces
        scrollEventThrottle={16}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
`;

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: '#fafafa',
  },
});

const fetchList = (tab: Tab) => {
  if (tab === 'feed') {
    return Feed;
  }
  if (tab === 'review') {
    return Review;
  }

  return Activity;
};

export default withSuspense(
  withTutorial(MyZam, 'MyZam'),
  <FullScreenLoader isLoading />,
);
