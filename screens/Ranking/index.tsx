import React, {useCallback, useRef} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import useCategories from '../../hooks/useCategories';
import useLayout from '../../hooks/useLayout';
import {headerOptions} from './config';
import Header from './Header';

function Ranking() {
  const flatlistRef = useRef<FlatList>(null);

  const {top} = useSafeAreaInsets();
  const {layout: headerLayout, onLayout} = useLayout();
  const {categoryInfo, changeCategory} = useCategories();

  const headerTranslateY = useSharedValue(0);
  const headerThresholdY = useSharedValue(0);

  const scrollTo = useCallback((y: number) => {
    flatlistRef?.current?.scrollToOffset({offset: y, animated: true});
  }, []);

  const onCategoryPressed = useCallback(
    (category: Category) => {
      const depth = category.cdEtc2;
      scrollTo(
        depth < headerOptions.thresholdDepth ? 0 : headerThresholdY.value,
      );
      changeCategory(category);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [changeCategory, scrollTo],
  );

  const onThresholdY = useCallback((thresholdY: number) => {
    headerThresholdY.value = thresholdY;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: {y},
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      headerTranslateY.value = Math.max(-y, -headerThresholdY.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Container paddingTop={top}>
      <Header
        top={top}
        translateY={headerTranslateY}
        onThresholdY={onThresholdY}
        onLayout={onLayout}
        depths={categoryInfo.depths}
        categories={categoryInfo.categories}
        selectedCategoryIds={categoryInfo.selectedCategoryIds}
        onCategoryPressed={onCategoryPressed}
      />
      <List
        ref={flatlistRef}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        numColumns={2}
        onScroll={onScroll}
        contentContainerStyle={{paddingTop: headerLayout?.height}}
        // eslint-disable-next-line react-native/no-inline-styles
        renderItem={() => <View style={{width: '100%', height: 300}} />}
      />
    </Container>
  );
}

const Container = styled.View<{paddingTop: number}>`
  padding-top: ${props => props.paddingTop}px;
  background-color: #ffffff;
  flex: 1;
`;

const List = styled(FlatList)`
  flex: 1;
`;

export default Ranking;
