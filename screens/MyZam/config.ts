import {width} from '../../constants';

export const tabs = ['activity', 'feed', 'review'] as const;
export type Tab = typeof tabs[number];

export const tabLabels: {
  [key in Tab]: string;
} = {
  activity: '내 활동',
  feed: '잼피드',
  review: '잼플 리뷰',
} as const;

export const pickRegisterTitle = '🐶\n나만 아는 찐템을\n소개해 주세요!';

export const profileHeight = width;
