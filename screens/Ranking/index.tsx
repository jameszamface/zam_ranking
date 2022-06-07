import React, {useCallback, useRef} from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import useCategories from '../../hooks/useCategories';
import useLayout from '../../hooks/useLayout';
import useProducts from '../../hooks/useProducts';
import useSort from '../../hooks/useSort';
import {headerOptions, Sort, sorts} from './config';
import Header from './Header';
import {width} from '../../constants';
import Product from '../../components/Product';
import {Product as ProductType} from '../../data/products';

const ITEM_GAP = 10;
const ITEM_IMAGE_RATIO = 0.85;

const ITEM_WIDTH = (width - ITEM_GAP * 3) / 2;
const ITEM_IMAGE_HEIGHT = ITEM_WIDTH * ITEM_IMAGE_RATIO;

function Ranking() {
  const flatlistRef = useRef<FlatList>(null);

  const {top} = useSafeAreaInsets();
  const {layout: headerLayout, onLayout} = useLayout();
  const {categoryInfo, changeCategory} = useCategories();
  const {sort, changeSort} = useSort<Sort>(
    categoryInfo.selectedCategoryIds[headerOptions.sortLinkedDepth],
    sorts[0],
  );
  const {products, isLoading, isError, hasNextPage, fetchNextPage} =
    useProducts({
      selectedCategoryIds: categoryInfo.selectedCategoryIds,
      sort,
    });

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

  const renderItem: ListRenderItem<ProductType> = ({item: product}) => {
    return (
      <Product
        product={product}
        width={ITEM_WIDTH}
        gap={ITEM_GAP}
        imageHeight={ITEM_IMAGE_HEIGHT}
      />
    );
  };

  const onEndReached = useCallback(() => {
    if (!hasNextPage) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

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
      <FlatList
        bounces={false}
        ref={flatlistRef}
        data={products || []}
        numColumns={2}
        onScroll={onScroll}
        contentContainerStyle={{paddingTop: (headerLayout?.height || 0) + top}}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
      />
    </Container>
  );
}

const Container = styled.View<{paddingTop: number}>`
  padding-top: ${props => props.paddingTop}px;
  background-color: #ffffff;
  flex: 1;
`;

export default Ranking;
