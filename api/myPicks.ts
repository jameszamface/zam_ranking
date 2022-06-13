import {picks} from '../data/myPicks';
import {delay} from '../utils/time';
import {createRandomID} from '../utils/id';

interface FetchMyPicksProps {
  cursor?: number;
}

export const fetchMyPicks = async (props: FetchMyPicksProps) => {
  console.log('fetchMyPicks', {cursor: props.cursor});
  const isLast = Math.random() > 0.85;
  await delay(1500);

  return {
    cursor: isLast ? undefined : (props.cursor || 0) + 1,
    picks: picks.map(pick => ({
      ...pick,
      id: createRandomID(),
    })),
  };
};
