import React, {useCallback} from 'react';
import useMyReviews from '../../../hooks/useMyReviews';
import { FlatList, ListRenderItem, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import {Review as ReviewType} from '../../../data/myReviews';
import ReviewComponent from '../../../components/Review';
import {TabProps} from './types';
import ListLoader from '../../../components/Loader/ListLoader';

function Review({minHeight = 0}: TabProps) {
  const {reviews, isLoading, isError, fetchNextReviews, hasNextPage} =
    useMyReviews();

  const onPress = useCallback((review?: ReviewType) => {
    console.log('잼플 리뷰', review?.GOODS_NM);
  }, []);

  const renderItem: ListRenderItem<ReviewType> = useCallback(
    ({item: review}) => {
      return (
        <ReviewComponent
          image=""
          name={review.GOODS_NM}
          brand={review.GOODS_BRAND}
          color={{
            string: `#${review.rgbCd}`,
            description: review.colorNm,
          }}
          purchased={!!review.orderId}
          note={review.ANS_NOTE}
          evals={review.evals}
          tags={review.hashtags}
          item={review}
          onPress={onPress}
          score={review.A1}
          date={review.YMD}
        />
      );
    },
    [onPress],
  );

  const onEndReached = useCallback(() => {
    if (isLoading || isError || !hasNextPage) return;
    fetchNextReviews();
  }, [isLoading, isError, hasNextPage, fetchNextReviews]);

  return (
    <FlatList
      style={[styles.listStyle, {minHeight}]}
      contentContainerStyle={styles.contentStyle}
      data={reviews}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      scrollEventThrottle={16}
      updateCellsBatchingPeriod={100}
      maxToRenderPerBatch={7}
      ListFooterComponent={
        <ListLoader
          height={!reviews ? minHeight : undefined}
          isLoading={isLoading}
        />
      }
    />
  );
}

const keyExtractor = (item: ReviewType) => String(item.ID);

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  contentStyle: {
    flexGrow: 1,
    backgroundColor: 'yellow',
  },
});

export default Review;
