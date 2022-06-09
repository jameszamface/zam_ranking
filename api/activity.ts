import {activities} from '../data/activity';

export const fetchWatchedCosmetics = async () => {
  return activities.watchedCosmetics;
};

export const fetchWatchedVideos = async () => {
  return activities.watchedVideos;
};

export const fetchScrapVideos = async () => {
  return activities.scrapVideos;
};

export const fetchLikedCosmetics = async () => {
  return activities.likedCosmetics;
};
