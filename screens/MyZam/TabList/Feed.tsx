import React from 'react';
import {Text, View} from 'react-native';
import Masonry from '../../../components/Masonry';
import useMyFeeds from '../../../hooks/useMyFeeds';

function Feed() {
  const {zamFeeds, isLoading, isError, fetchNextFeeds, hasNextPage} =
    useMyFeeds();

  return (
    <Masonry
      data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
      numColumns={2}
      gap={2}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              width: '100%',
              height: index % 3 ? 100 : 150,
              backgroundColor: index % 3 ? 'red' : 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{index}</Text>
          </View>
        );
      }}
      keyExtractor={item => String(item)}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default Feed;
