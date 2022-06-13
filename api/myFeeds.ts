import _ from 'lodash';
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
    zamFeeds: _.shuffle(
      zamFeedsWithoutId.map(zamFeed => {
        const imageSize = getImageSzie(zamFeed.feed.imageSizes);
        return {
          ...zamFeed,
          feed: {
            id: createRandomID(),
            imageSize,
            ...zamFeed.feed,
          },
        };
      }),
    ),
  };
};

const getImageSzie = (
  imageSizes: string | null | undefined,
): number[] | undefined => {
  if (!imageSizes) return;
  try {
    return JSON.parse(imageSizes)[0] as number[];
  } catch (e) {}
};
