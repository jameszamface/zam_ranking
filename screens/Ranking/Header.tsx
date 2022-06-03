import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import {Dictionary} from '../../constants/types';
import CategoryButton from './CetegoryButton';
import TappableText from './TappableText';

interface Props {
  depths: number[];
  categories: Dictionary<Category[]>;
  selectedCategory: Dictionary<Category>;
  changeCategory: (category: Category) => void;
}

function Header({depths, categories, selectedCategory, changeCategory}: Props) {
  const onPress = (category: Category) => {
    changeCategory(category);
  };

  return (
    <Container>
      {depths.map((depth, index) => {
        const depthCategories = categories[depth];
        if (!depthCategories) {
          return;
        }

        if (index === 0) {
          return (
            <ScrollView
              key={depth}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {depthCategories.map(category => (
                <CategoryButton
                  key={`@category_${index}_${category.cdId}`}
                  category={category}
                  name={category.cdNm}
                  image=""
                  onPress={onPress}
                  color={category.cdEtc1}
                  selected={
                    selectedCategory[depth] &&
                    category.cdId === selectedCategory[depth].cdId
                  }
                />
              ))}
            </ScrollView>
          );
        }
        return (
          <ScrollView
            key={depth}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {depthCategories.map(category => (
              <TappableText
                category={category}
                onPress={onPress}
                key={`@category_${index}_${category.cdId}`}
                showIndicator={!!(index % 2)}
                selected={
                  selectedCategory[depth] &&
                  category.cdId === selectedCategory[depth].cdId
                }>
                {category.cdNm}
              </TappableText>
            ))}
          </ScrollView>
        );
      })}
    </Container>
  );
}

// 나중에 Reanimated.View로 교체
const Container = styled.View`
  position: absolute;
`;

export default Header;
