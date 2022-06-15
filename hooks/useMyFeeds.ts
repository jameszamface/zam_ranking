import _ from 'lodash';
import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQueryClient, InfiniteData} from 'react-query';
import {FetchFeedsResult, fetchMyFeeds} from '../api/myFeeds';
import {ZamFeed} from '../data/myFeeds';

interface Props {
  enabled?: boolean;
}

function useMyFeeds(props?: Props) {
  const queryClient = useQueryClient();

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
      refetchOnMount: false,
      enabled: props?.enabled ?? true,
    },
  );

  const [zamFeeds, setZamFeeds] = useState<ZamFeed[]>();

  useEffect(() => {
    if (!data) return;
    const newZamFeeds = _.flatMap(data.pages, 'zamFeeds') as ZamFeed[];
    setZamFeeds(newZamFeeds);
  }, [data]);

  const changeFeed = (zamFeed: ZamFeed) => {
    queryClient.setQueryData('myFeeds', oldData => {
      const clonedData = _.cloneDeep(oldData) as
        | InfiniteData<FetchFeedsResult>
        | undefined;
      if (!clonedData) return oldData;

      const indices = findFeedIndices(clonedData, zamFeed);
      if (!indices) return oldData;
      const {pageIndex, feedIndex} = indices;
      clonedData.pages[pageIndex].zamFeeds[feedIndex] = zamFeed;
      return clonedData;
    });
  };

  const deleteFeed = (zamFeed: ZamFeed) => {
    queryClient.setQueryData('myFeeds', oldData => {
      const clonedData = _.cloneDeep(oldData) as
        | InfiniteData<FetchFeedsResult>
        | undefined;
      if (!clonedData) return oldData;

      const indices = findFeedIndices(clonedData, zamFeed);
      if (!indices) return oldData;
      const {pageIndex, feedIndex} = indices;
      clonedData.pages[pageIndex].zamFeeds.splice(feedIndex, 1);
      return clonedData;
    });
  };

  return {
    zamFeeds,
    hasNextPage,
    fetchNextFeeds: fetchNextPage,
    isLoading: isFetching || isFetchingNextPage,
    isError,
    changeFeed,
    deleteFeed,
  };
}

const findFeedIndices = (
  oldData: InfiniteData<FetchFeedsResult>,
  zamFeed: ZamFeed,
) => {
  let feedIndex = -1;
  const pageIndex = _.findIndex(oldData.pages, page => {
    feedIndex = _.findIndex(page.zamFeeds, oldZamFeed => {
      return oldZamFeed.feed.id === zamFeed.feed.id;
    });
    if (feedIndex === -1) return false;
    return true;
  });

  if (pageIndex === -1 || feedIndex === -1) return;
  return {pageIndex, feedIndex};
};

export default useMyFeeds;
