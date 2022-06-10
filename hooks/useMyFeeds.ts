import _ from 'lodash';
import {useEffect, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {fetchMyFeeds} from '../api/myFeeds';
import {ZamFeed} from '../data/myFeeds';

function useMyFeeds() {
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery(
    'myFeeds',
    ({pageParam}) => fetchMyFeeds({cursor: pageParam}),
    {
      getNextPageParam: lastPage => lastPage.cursor,
      getPreviousPageParam: firstPage => firstPage.cursor,
    },
  );

  const [zamFeeds, setZamFeeds] = useState<ZamFeed[]>();

  useEffect(() => {
    if (!data) return;
    const newZamFeeds = _.flatMap(data.pages, 'zamFeeds') as ZamFeed[];
    setZamFeeds(newZamFeeds);
  }, [data]);

  return {
    zamFeeds,
    hasNextPage,
    fetchNextFeeds: fetchNextPage,
    isLoading: isFetching || isFetchingNextPage,
    isError,
  };
}

export default useMyFeeds;
