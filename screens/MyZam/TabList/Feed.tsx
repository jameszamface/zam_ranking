import React, {useCallback} from 'react';
import {ListRenderItem, StyleSheet} from 'react-native';
import PictureFeed from '../../../components/Feed/PictureFeed';
import QuestionFeed from '../../../components/Feed/QuestionFeed';
import Masonry from '../../../components/Masonry';
import {ZamFeed} from '../../../data/myFeeds';
import useMyFeeds from '../../../hooks/useMyFeeds';
import {TabProps} from './types';

function Feed({minHeight = 0}: TabProps) {
  const {zamFeeds, isLoading, isError, fetchNextFeeds, hasNextPage} =
    useMyFeeds();

  const onPress = useCallback((zamFeed?: ZamFeed) => {
    console.log('Zam Feed', zamFeed?.feed.note);
  }, []);

  const renderItem: ListRenderItem<ZamFeed> = ({item: zamFeed}) => {
    const isQuestion = zamFeed.feed.section === 5;

    const Component = isQuestion ? QuestionFeed : PictureFeed;

    const image = zamFeed.imageUris ? zamFeed.imageUris[0].uri : undefined;

    const [width, height] = zamFeed.feed.imageSize || [1, 1];
    const ratio = height / width;

    return (
      <Component
        image={image}
        ratio={ratio}
        note={zamFeed.feed.note}
        item={zamFeed}
        onPress={onPress}
      />
    );
  };

  const onEndReached = () => {
    if (isLoading || isError || !hasNextPage) return;
    fetchNextFeeds();
  };

  return (
    <Masonry
      style={[styles.container, {minHeight}]}
      contentContainerStyle={styles.contentContainerStyle}
      data={zamFeeds}
      numColumns={2}
      gap={10}
      renderItem={renderItem}
      keyExtractor={item => String(item)}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 15,
    backgroundColor: '#eeeeee',
  },
  contentContainerStyle: {
    backgroundColor: '#eeeeee',
  },
});

export default Feed;
