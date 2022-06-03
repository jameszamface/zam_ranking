import React from 'react';
import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import Header from './Header';

function Ranking() {
  const onCategoriesChanged = (categories: {
    category1: Category;
    category2: Category;
    category3: Category;
  }) => {
    console.log(categories);
    // TODO: 여기서 제품을 가져온다.
  };

  return (
    <Container>
      <List
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        numColumns={2}
        // eslint-disable-next-line react-native/no-inline-styles
        renderItem={() => <View style={{width: '100%', height: 300}} />}
      />
      <Header onCategoriesChanged={onCategoriesChanged} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const List = styled(FlatList)`
  flex: 1;
`;

export default Ranking;
