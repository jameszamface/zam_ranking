import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import useCategories from '../../hooks/useCategories';
import CategoryButton from './CetegoryButton';
import TappableText from './TappableText';

interface Props {
  onCategoriesChanged: (categories: {
    category1: Category;
    category2: Category;
    category3: Category;
  }) => void;
}

function Header({onCategoriesChanged}: Props) {
  const {categories, selectedCategory, changeCategory} = useCategories();

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }
    onCategoriesChanged && onCategoriesChanged(selectedCategory);
  }, [onCategoriesChanged, selectedCategory]);

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
