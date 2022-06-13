import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchMyPicks } from '../api/myPicks';
import { Pick } from '../data/myPicks';

function useMyPicks() {
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery(
    'myMyPicks',
    ({pageParam}) => fetchMyPicks({cursor: pageParam}),
    {
      getNextPageParam: lastPage => lastPage.cursor,
      getPreviousPageParam: firstPage => firstPage.cursor,
    },
  );

  const [myPicks, setMyPicks] = useState<Pick[]>();

  useEffect(() => {
    if (!data) return;
    const newMyPicks = _.flatMap(data.pages, 'zamFeeds') as Pick[];
    setMyPicks(newMyPicks);
  }, [data]);

  return {
    myPicks,
    hasNextPage,
    fetchNextPicks: fetchNextPage,
    isLoading: isFetching || isFetchingNextPage,
    isError,
  };
}

export default useMyPicks;
