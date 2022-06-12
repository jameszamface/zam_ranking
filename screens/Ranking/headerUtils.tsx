import React from 'react';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import ScrollViewWithScrollTo, {
  Separtor,
} from '../../components/ScrollViewWithScrollTo';
import TappableImage from '../../components/Tappable/TappableImage';
import TappableText from '../../components/Tappable/TappableText';
import {CategoryInfo} from '../../hooks/useCategories';
import {CategoryOption, headerOptions} from './config';

const EtcCategoriesContainer = styled.View`
  margin-bottom: 10px;
`;

const convertCategoriesToComponents = (
  categories: Category[],
  selectedCategoryId: string,
  onPress: (category: Category) => void,
  option?: CategoryOption,
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

export const convertCategoriesToList = ({
  depthCategories: [depth, categories],
  categoryInfo,
  onPress,
  key,
  separator,
}: {
  depthCategories: [string, Category[]];
  categoryInfo: CategoryInfo;
  onPress: (category: Category) => void;
  key: string;
  separator?: Separtor;
}) => {
  const selectedCategoryId = categoryInfo.selectedCategoryIds[depth];
  const option = headerOptions.categories[depth];

  return (
    <ScrollViewWithScrollTo
      horizontal
      style={option.style}
      separator={separator}
      backgroundColor="#ffffff"
      showsHorizontalScrollIndicator={false}
      key={key}>
      {convertCategoriesToComponents(
        categories,
        selectedCategoryId,
        onPress,
        option,
      )}
    </ScrollViewWithScrollTo>
  );
};

export const generateCategoriesList = ({
  depthCategoriesArray,
  categoryInfo,
  onPress,
  isMainCategory,
}: {
  depthCategoriesArray:
    | [string, Category[]]
    | [string, Category[]][]
    | undefined;
  categoryInfo: CategoryInfo;
  onPress: (category: Category) => void;
  isMainCategory: boolean;
}) => {
  if (isMainCategory) {
    const depthCategories = depthCategoriesArray as
      | [string, Category[]]
      | undefined;

    if (!depthCategories) {
      return null;
    }

    return convertCategoriesToList({
      depthCategories,
      categoryInfo,
      onPress,
      key: 'main_category',
    });
  }

  const etcCategoriesArray = depthCategoriesArray as [string, Category[]][];
  const separator = {
    width: etcCategoriesArray.length > 1 ? 1 : 0.5,
    color: '#cccccc',
  };
  return (
    <EtcCategoriesContainer>
      {etcCategoriesArray.map((etcCategories, index) =>
        convertCategoriesToList({
          depthCategories: etcCategories,
          categoryInfo,
          onPress,
          key: `etc_categories_${index}`,
          separator,
        }),
      )}
    </EtcCategoriesContainer>
  );
};
