import React from 'react';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import TappableImage from '../../components/Tappable/TappableImage';
import TappableText from '../../components/Tappable/TappableText';
import ScrollViewWithScrollTo from '../../components/ScrollViewWithScrollTo';
import {ViewStyle} from 'react-native';

interface Option {
  type: 'image' | 'text';
  showIndicator?: boolean;
  style?: ViewStyle;
}

const settings: Option[] = [
  {
    type: 'image',
    style: {
      paddingTop: 10,
      paddingBottom: 5,
    },
  },
  {
    type: 'text',
    showIndicator: true,
    style: {
      paddingHorizontal: 5,
    },
  },
  {
    type: 'text',
    showIndicator: false,
    style: {
      paddingHorizontal: 5,
    },
  },
];

interface Props {
  categories: Category[][];
  selectedCategoryIds: string[];
  changeCategory: (category: Category) => void;
}

function Header({categories, selectedCategoryIds, changeCategory}: Props) {
  const onPress = (category: Category) => {
    changeCategory(category);
  };

  return (
    <Container>
      {categories.map((depthCategories, index) => {
        const selectedCategoryId = selectedCategoryIds[index];
        const option = settings[index];

        return (
          <ScrollViewWithScrollTo
            key={index}
            horizontal
            contentContainerStyle={option.style}
            showsHorizontalScrollIndicator={false}>
            {convertCategoriesToComponents(
              depthCategories,
              selectedCategoryId,
              onPress,
              option,
            )}
          </ScrollViewWithScrollTo>
        );
      })}
    </Container>
  );
}

// 나중에 Reanimated.View로 교체
const Container = styled.View`
  background-color: #ffffff;
  position: absolute;
`;

const convertCategoriesToComponents = (
  categories: Category[],
  selectedCategoryId: string,
  onPress: (category: Category) => void,
  option?: Option,
) => {
  return categories.map(category => {
    const isText = option?.type === 'text';
    const Component = isText ? TappableText : TappableImage;
    const gap = isText ? 10 : 5;

    return (
      <Component
        item={category}
        key={category.cdId}
        gap={gap}
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

export default Header;
