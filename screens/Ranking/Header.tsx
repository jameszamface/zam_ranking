import React from 'react';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import TappableImage from '../../components/Tappable/TappableImage';
import TappableText from '../../components/Tappable/TappableText';
import ScrollViewWithScrollTo from '../../components/ScrollViewWithScrollTo';

interface Option {
  type: 'image' | 'text';
  showIndicator?: boolean;
}

const settings: Option[] = [
  {
    type: 'image',
  },
  {
    type: 'text',
    showIndicator: true,
  },
  {
    type: 'text',
    showIndicator: false,
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
  position: absolute;
`;

const convertCategoriesToComponents = (
  categories: Category[],
  selectedCategoryId: string,
  onPress: (category: Category) => void,
  option?: Option,
) => {
  return categories.map((category, index) => {
    const Component = option?.type === 'text' ? TappableText : TappableImage;

    return (
      <Component
        item={category}
        key={`@category_${index}_${category.cdId}`}
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
