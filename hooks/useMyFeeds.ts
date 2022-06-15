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

      const indices = findFeedIndices2(clonedData, zamFeed);
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

      const indices = findFeedIndices2(clonedData, zamFeed);
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

const findFeedIndices2 = (
  oldData: InfiniteData<FetchFeedsResult>,
  zamFeed: ZamFeed,
) => {
  const feedsWithIndices = _.flatMap(oldData.pages, (page, pageIndex) => {
    return page.zamFeeds.map((feed, feedIndex) => ({
      originFeed: feed,
      pageIndex,
      feedIndex,
    }));
  });

  // feedsWithIndices를 시간 등을 기준으로 정렬해서 검색한다면 더 빠를 수도 있을 것이다.
  const feedWithIndices = feedsWithIndices.find(feedWithIndices => {
    return feedWithIndices.originFeed.feed.id === zamFeed.feed.id;
  });

  if (!feedWithIndices) return;

  const result = _.pick(feedWithIndices, ['pageIndex', 'feedIndex']);
  return result;
};

export default useMyFeeds;
