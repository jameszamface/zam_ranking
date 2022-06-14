import _ from 'lodash';
import {useState, useEffect} from 'react';
import {useInfiniteQuery} from 'react-query';
import {fetchMyReviews} from '../api/myReviews';
import {Review} from '../data/myReviews';

function useMyReviews() {
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery(
    'myReviews',
    ({pageParam}) => fetchMyReviews({cursor: pageParam}),
    {
      getNextPageParam: lastPage => lastPage.cursor,
      getPreviousPageParam: firstPage => firstPage.cursor,
      refetchOnMount: false,
    },
  );

  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    if (!data) return;
    const newReviews = _.flatMap(data.pages, 'reviews') as Review[];
    setReviews(newReviews);
  }, [data]);

  return {
    reviews,
    hasNextPage,
    fetchNextReviews: fetchNextPage,
    isLoading: isFetching || isFetchingNextPage,
    isError,
  };
}

export default useMyReviews;
