import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import Text from '../../../components/Text';
import useMyReviews from '../../../hooks/useMyReviews';
import {FlatList, ListRenderItem, StyleProp, ViewStyle} from 'react-native';
import {Review as ReviewType} from '../../../data/myReviews';
import ReviewComponent from '../../../components/Review';

function Review() {
  const {reviews, isLoading, isError, fetchNextReviews} = useMyReviews();

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
    if (isLoading || isError) return;
    fetchNextReviews();
  }, [isLoading, isError, fetchNextReviews]);

  return (
    <FlatList
      style={containerStyle}
      data={reviews}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
    />
  );
}

const keyExtractor = (item: ReviewType) => String(item.ID);

const containerStyle: StyleProp<ViewStyle> = {
  backgroundColor: '#ffffff',
  paddingHorizontal: 15,
};

export default Review;
