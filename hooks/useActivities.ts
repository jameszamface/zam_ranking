import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import {
  fetchLikedCosmetics,
  fetchScrapVideos,
  fetchWatchedCosmetics,
  fetchWatchedVideos,
} from '../api/myActivities';
import {LikedCosmetic, WatchedCosmetic, Video} from '../data/myActivities';

export function useWatchedCosmetics() {
  const {data, isLoading, isError} = useQuery(
    ['activity', 'watchedCosmetics'],
    fetchWatchedCosmetics,
  );
  const [watchedCosmetics, setWatchedCosmetics] = useState<WatchedCosmetic[]>();

  useEffect(() => {
    if (!data || isLoading || isError) return;
    setWatchedCosmetics(data);
  }, [data, isLoading, isError]);

  return {watchedCosmetics, isLoading, isError};
}

export function useWatchedVideos() {
  const {data, isLoading, isError} = useQuery(
    ['activity', 'watchedVideos'],
    fetchWatchedVideos,
  );
  const [watchedVideos, setWatchedVideos] = useState<Video[]>();

  useEffect(() => {
    if (!data || isLoading || isError) return;
    setWatchedVideos(data);
  }, [data, isLoading, isError]);

  return {watchedVideos, isLoading, isError};
}

export function useScrapVideos() {
  const {data, isLoading, isError} = useQuery(
    ['activity', 'scrapVideos'],
    fetchScrapVideos,
  );
  const [scrapVideos, setScrapVideos] = useState<Video[]>();

  useEffect(() => {
    if (!data || isLoading || isError) return;
    setScrapVideos(data);
  }, [data, isLoading, isError]);

  return {scrapVideos, isLoading, isError};
}

export function useLikedCosmetics() {
  const {data, isLoading, isError} = useQuery(
    ['activity', 'likedCosmetics'],
    fetchLikedCosmetics,
  );
  const [likedCosmetics, setLikedCosmetics] = useState<LikedCosmetic[]>();

  useEffect(() => {
    if (!data || isLoading || isError) return;
    setLikedCosmetics(data);
  }, [data, isLoading, isError]);

  return {likedCosmetics, isLoading, isError};
}
