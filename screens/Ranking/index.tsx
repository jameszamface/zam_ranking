import React from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import styled from 'styled-components/native';
import TappableText from '../../components/TappableText';
import useCategories from '../../hooks/useCategories';
import CategoryButton from './CetegoryButton';

function Ranking() {
  const {categories, selectedCategory, changeCategory} = useCategories();

  return (
    <List
      ListHeaderComponent={
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories?.categories1?.map(category1 => (
              <CategoryButton
                key={`@category_1_${category1.cdId}`}
                category={category1}
                name={category1.cdNm}
                image=""
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
                key={`@category_3_${category3.cdId}`}
                selected={
                  selectedCategory?.category3 &&
                  category3.cdId === selectedCategory.category3.cdId
                }>
                {category3.cdNm}
              </TappableText>
            ))}
          </ScrollView>
        </>
      }
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      numColumns={2}
      // eslint-disable-next-line react-native/no-inline-styles
      renderItem={() => <View style={{width: '100%', height: 300}} />}
    />
  );
}

const List = styled(FlatList)`
  flex: 1;
`;

export default Ranking;
