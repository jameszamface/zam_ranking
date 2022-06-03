import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import CategoryButton from './CetegoryButton';
import TappableText from './TappableText';

interface Props {
  categories:
    | {
        categories1: Category[];
        categories2: Category[];
        categories3: Category[];
      }
    | undefined;
  selectedCategory:
    | {
        category1: Category;
        category2: Category;
        category3: Category;
      }
    | undefined;
  changeCategory: (category: Category) => void;
}

function Header({categories, selectedCategory, changeCategory}: Props) {
  const onPress = (category: Category) => {
    changeCategory(category);
  };

  return (
    <Container>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories?.categories1?.map(category1 => (
          <CategoryButton
            key={`@category_1_${category1.cdId}`}
            category={category1}
            name={category1.cdNm}
            image=""
            onPress={onPress}
            color={category1.cdEtc1}
            selected={
              selectedCategory?.category1 &&
              category1.cdId === selectedCategory.category1.cdId
            }
          />
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories?.categories2?.map(category2 => (
          <TappableText
            category={category2}
            onPress={onPress}
            key={`@category_2_${category2.cdId}`}
            showIndicator
            selected={
              selectedCategory?.category2 &&
              category2.cdId === selectedCategory.category2.cdId
            }>
            {category2.cdNm}
          </TappableText>
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories?.categories3?.map(category3 => (
          <TappableText
            category={category3}
            onPress={onPress}
            key={`@category_3_${category3.cdId}`}
            selected={
              selectedCategory?.category3 &&
              category3.cdId === selectedCategory.category3.cdId
            }>
            {category3.cdNm}
          </TappableText>
        ))}
      </ScrollView>
    </Container>
  );
}

// 나중에 Reanimated.View로 교체
const Container = styled.View`
  position: absolute;
`;

export default Header;
