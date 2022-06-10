import {ZamFeed, zamFeedsWithoutId} from '../data/myFeeds';
import {createRandomID} from '../utils/id';
import {delay} from '../utils/time';

interface FetchFeedsProps {
  cursor?: number;
}

export const fetchMyFeeds = async (
  props: FetchFeedsProps,
): Promise<{
  cursor?: number;
  zamFeeds: ZamFeed[];
}> => {
  console.log('fetchMyFeeds', {cursor: props.cursor});
  const isLast = Math.random() > 0.85;
  await delay(1500);

  return {
    cursor: isLast ? undefined : (props.cursor || 0) + 1,
    zamFeeds: zamFeedsWithoutId.map(zamFeed => ({
      ...zamFeed,
      feed: {
        id: createRandomID(),
        ...zamFeed.feed,
      },
    })),
  };
};
