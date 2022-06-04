import React from 'react';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import {Dictionary} from '../../constants/types';
import TappableImage from '../../components/Tappable/TappableImage';
import HorizontalScrollView from '../../components/HorizontalScrollView';
import TappableText from '../../components/Tappable/TappableText';

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
  depths: number[];
  categories: Dictionary<Category[]>;
  selectedCategories: Dictionary<Category>;
  changeCategory: (category: Category) => void;
}

function Header({
  depths,
  categories,
  selectedCategories,
  changeCategory,
}: Props) {
  const onPress = (category: Category) => {
    changeCategory(category);
  };

  return (
    <Container>
      {depths.map((depth, index) => {
        const depthCategories = categories[depth];
        const selectedCategory = selectedCategories[depth];
        const option = settings[index];

        return (
          <HorizontalScrollView key={depth}>
            {convertCategoriesToComponents(
              depthCategories,
              selectedCategory,
              onPress,
              option,
            )}
          </HorizontalScrollView>
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
  selectedCategory: Category,
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
        selected={selectedCategory && selectedCategory.cdId === category.cdId}
        onPress={onPress}>
        {category.cdNm}
      </Component>
    );
  });
};

export default Header;
