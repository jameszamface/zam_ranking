import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Masonry from '../../../components/Masonry';
import useMyFeeds from '../../../hooks/useMyFeeds';

function Feed() {
  const {zamFeeds, isLoading, isError, fetchNextFeeds, hasNextPage} =
    useMyFeeds();

  return (
    <Masonry
      data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
      numColumns={2}
      gap={10}
      renderItem={({index}) => {
        console.log(index);
        return (
          <View
            style={{
              width: '100%',
              height: index % 3 ? 50 : 75,
              backgroundColor: index % 3 ? 'red' : 'blue',
            }}
          />
        );
      }}
      keyExtractor={item => String(item)}
      scrollEventThrottle={16}
    />
  );
}

export default Feed;
