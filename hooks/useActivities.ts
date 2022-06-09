import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import {fetchActivities} from '../api/activity';
import {LinkedCosmetic, WatchedCosmetic, Video} from '../data/activity';

type ActivitiesArray = [string, WatchedCosmetic | LinkedCosmetic | Video][];

function useActivities() {
  const {data, isLoading, isError} = useQuery('myZamActivity', fetchActivities);
  const [activities, setActivities] = useState<ActivitiesArray | undefined>();

  useEffect(() => {
    if (!data || isLoading || isError) return;
    setActivities(Object.entries(data) as ActivitiesArray);
  }, [data, isLoading, isError]);

  return {activities, isLoading, isError};
}

export default useActivities;
