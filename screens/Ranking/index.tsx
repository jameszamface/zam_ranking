import React from 'react';
import {FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import useCategories from '../../hooks/useCategories';
import Header from './Header';

function Ranking() {
  const {top} = useSafeAreaInsets();

  const {categoryInfo, changeCategory} = useCategories();

  return (
    <Container paddingTop={top}>
      <List
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        numColumns={2}
        // eslint-disable-next-line react-native/no-inline-styles
        renderItem={() => <View style={{width: '100%', height: 300}} />}
      />
      <Header
        categories={categoryInfo.categories}
        selectedCategoryIds={categoryInfo.selectedCategoryIds}
        changeCategory={changeCategory}
      />
    </Container>
  );
}

const Container = styled.View<{paddingTop: number}>`
  padding-top: ${props => props.paddingTop}px;
  background-color: #ffffff;
  flex: 1;
`;

const List = styled(FlatList)`
  flex: 1;
`;

export default Ranking;
