import {activities} from '../data/myActivities';

export const fetchWatchedCosmetics = async () => {
  console.log('fetchWatchedCosmetics');
  return activities.watchedCosmetics;
};

export const fetchWatchedVideos = async () => {
  console.log('fetchWatchedVideos');
  return activities.watchedVideos;
};

export const fetchScrapVideos = async () => {
  console.log('fetchScrapVideos');
  return activities.scrapVideos;
};

export const fetchLikedCosmetics = async () => {
  console.log('fetchLikedCosmetics');
  return activities.likedCosmetics;
};
