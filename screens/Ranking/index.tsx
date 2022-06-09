import React, {useCallback, useRef} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import useCategories from '../../hooks/useCategories';
import useProducts from '../../hooks/useProducts';
import useSort from '../../hooks/useSort';
import {headerOptions, Sort, sorts} from './config';
import {width} from '../../constants';
import Product from '../../components/Product';
import {Product as ProductType} from '../../data/products';
import ListLoader from '../../components/Loader/ListLoader';
import {generateCategoriesList} from './headerUtils';

const ITEM_GAP = 10;
const ITEM_IMAGE_RATIO = 0.85;

const ITEM_WIDTH = (width - ITEM_GAP * 3) / 2;
const ITEM_IMAGE_HEIGHT = ITEM_WIDTH * ITEM_IMAGE_RATIO;

function Ranking() {
  const flatlistRef = useRef<FlatList>(null);

  const {top} = useSafeAreaInsets();
  const {categoryInfo, changeCategory} = useCategories();
  const {sort, changeSort} = useSort<Sort>(
    sorts[0],
    categoryInfo.selectedCategoryIds[headerOptions.sortLinkedDepth],
  );
  const {products, isLoading, isError, hasNextPage, fetchNextPage} =
    useProducts({
      selectedCategoryIds: categoryInfo.selectedCategoryIds,
      sort,
    });

  const onCategoryPressed = useCallback(
    (category: Category) => {
      const {cdId: id, cdEtc2: depth} = category;
      if (id === categoryInfo.selectedCategoryIds[depth]) {
        return;
      }
      const isMainCategory = depth === headerOptions.mainCategoryDepth;
      flatlistRef?.current?.scrollToIndex({index: isMainCategory ? 0 : 1});
      changeCategory(category);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [changeCategory],
  );

  const renderProduct: ListRenderItem<ProductType> = ({item}) => {
    return (
      <Product
        product={item}
        width={ITEM_WIDTH}
        imageHeight={ITEM_IMAGE_HEIGHT}
        gap={ITEM_GAP}
      />
    );
  };

  const onEndReached = useCallback(() => {
    if (!hasNextPage || isLoading) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isLoading]);

  const renderCategoriesOrProducts: ListRenderItem<
    [string, Category[]] | [string, Category[]][] | ProductType[] | undefined
  > = useCallback(
    ({item, index}) => {
      const isCategoryInfo = index === 0 || index === 1;
      if (isCategoryInfo) {
        const depthCategoriesArray = item as
          | [string, Category[]]
          | [string, Category[]][];
        return generateCategoriesList({
          depthCategoriesArray,
          categoryInfo,
          onPress: onCategoryPressed,
          isMainCategory: index === 0,
        });
      }

      // 제품 랜더링
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const products = item as ProductType[];
      return (
        <FlatList
          data={products}
          onEndReached={onEndReached}
          numColumns={2}
          renderItem={renderProduct}
          ListFooterComponent={
            <ListLoader
              isLoading={isLoading}
              height={!products ? 500 : undefined}
            />
          }
        />
      );
    },
    [categoryInfo, isLoading, onCategoryPressed, onEndReached],
  );

  return (
    <Container paddingTop={top}>
      <FlatList
        ref={flatlistRef}
        data={[categoryInfo.mainCategory, categoryInfo.etcCategories, products]}
        stickyHeaderIndices={[1]}
        renderItem={renderCategoriesOrProducts}
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
