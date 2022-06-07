import React, {useCallback, useRef} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import useCategories from '../../hooks/useCategories';
import useProducts from '../../hooks/useProducts';
import useSort from '../../hooks/useSort';
import {HeaderOption, headerOptions, Sort, sorts} from './config';
import {width} from '../../constants';
import Product from '../../components/Product';
import {Product as ProductType} from '../../data/products';
import ScrollViewWithScrollTo from '../../components/ScrollViewWithScrollTo';
import TappableText from '../../components/Tappable/TappableText';
import TappableImage from '../../components/Tappable/TappableImage';

const ITEM_GAP = 10;
const ITEM_IMAGE_RATIO = 0.85;

const ITEM_WIDTH = (width - ITEM_GAP * 3) / 2;
const ITEM_IMAGE_HEIGHT = ITEM_WIDTH * ITEM_IMAGE_RATIO;

function Ranking() {
  const flatlistRef = useRef<FlatList>(null);

  const {top} = useSafeAreaInsets();
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
    if (!hasNextPage) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  const renderCategoriesOrProducts: ListRenderItem<
    [string, Category[]] | [string, Category[]][] | ProductType[] | undefined
  > = useCallback(
    ({item, index}) => {
      if (!item) {
        return null;
      }
      if (index === 0) {
        const [depth, mainCategories] = item as [string, Category[]];
        const selectedCategoryId = categoryInfo.selectedCategoryIds[depth];
        const option = headerOptions.categories[depth];

        return (
          <ScrollViewWithScrollTo
            horizontal
            style={option.style}
            showsHorizontalScrollIndicator={false}
            key="main_category">
            {convertCategoriesToComponents(
              mainCategories,
              selectedCategoryId,
              onCategoryPressed,
              option,
            )}
          </ScrollViewWithScrollTo>
        );
      }
      if (index === 1) {
        const etcCategoriesArray = item as [string, Category[]][];
        const separator = {
          width: etcCategoriesArray.length > 1 ? 1 : 0.5,
          color: '#cccccc',
        };
        return (
          <EtcCategoriesContainer>
            {etcCategoriesArray.map(([depth, etcCategories], etcIndex) => {
              const selectedCategoryId =
                categoryInfo.selectedCategoryIds[depth];
              const option = headerOptions.categories[depth];

              console.log(option);

              return (
                <ScrollViewWithScrollTo
                  separator={separator}
                  backgroundColor="#ffffff"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  key={`etc_category_${etcIndex}`}>
                  {convertCategoriesToComponents(
                    etcCategories,
                    selectedCategoryId,
                    onCategoryPressed,
                    option,
                  )}
                </ScrollViewWithScrollTo>
              );
            })}
          </EtcCategoriesContainer>
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const products = item as ProductType[];
      return (
        <FlatList
          data={products}
          onEndReached={onEndReached}
          numColumns={2}
          renderItem={renderProduct}
        />
      );
    },
    [categoryInfo.selectedCategoryIds, onCategoryPressed, onEndReached],
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

const EtcCategoriesContainer = styled.View`
  margin-bottom: 10px;
`;

const convertCategoriesToComponents = (
  categories: Category[],
  selectedCategoryId: string,
  onPress: (category: Category) => void,
  option?: HeaderOption,
) => {
  return categories.map(category => {
    const isText = option?.type === 'text';
    const Component = isText ? TappableText : TappableImage;

    return (
      <Component
        item={category}
        key={category.cdId}
        style={isText ? headerOptions.textStyle : headerOptions.imageStyle}
        image="" // only for TappableImage
        backgroundColor={category.cdEtc1} // only for TappableImage
        showIndicator={option?.showIndicator} // only for TappableText
        selectedColor="#000000"
        selected={selectedCategoryId === category.cdId}
        onPress={onPress}>
        {category.cdNm}
      </Component>
    );
  });
};

export default Ranking;
