import _ from 'lodash';
import {evalScoreDictionary} from '../constants';
import {Review, reviews} from '../data/myReviews';
import {delay} from '../utils/time';

interface FetchReviewsProps {
  cursor?: number;
}

export const fetchMyReviews = async (
  props: FetchReviewsProps,
): Promise<{
  cursor?: number;
  reviews: Review[];
}> => {
  console.log('fetchReviews', {cursor: props.cursor});
  const isLast = Math.random() > 0.85;
  await delay(1500);

  return {
    cursor: isLast ? undefined : (props.cursor || 0) + 1,
    reviews: reviews.map(reviewWithoutId => {
      const labels = reviewWithoutId.evalNm.split(',');
      const evalScores = (JSON.parse(reviewWithoutId.ANS) as (1 | 2 | 3)[]).map(
        number => evalScoreDictionary[number],
      );

      const evals = _.zip(labels, evalScores);
      return {
        ...reviewWithoutId,
        ID: Math.floor(Math.random() * 1000000),
        evals,
      };
    }),
  };
};
