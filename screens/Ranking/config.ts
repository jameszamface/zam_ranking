import {StyleProp, ViewStyle} from 'react-native';
import {Dictionary} from '../../constants/types';

export interface HeaderOption {
  type: 'image' | 'text';
  showIndicator?: boolean;
  style?: ViewStyle;
  scrollThreshold?: boolean; // 처음 나온 설정에서만
}

export const headerOptions: {
  categories: Dictionary<HeaderOption>;
  thresholdDepth: string;
  sortLinkedDepth: string;
  imageStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<ViewStyle>;
} = {
  categories: {
    '0': {
      type: 'image',
      style: {
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 5,
      },
    },
    '1': {
      type: 'text',
      showIndicator: true,
      style: {
        paddingHorizontal: 5,
      },
      scrollThreshold: true,
    },
    '2': {
      type: 'text',
      showIndicator: false,
      style: {
        paddingHorizontal: 5,
      },
    },
  },
  thresholdDepth: '1',
  sortLinkedDepth: '0',
  imageStyle: {
    width: 100,
    height: 130,
    marginRight: 15,
  },
  textStyle: {
    height: 45,
    marginRight: 15,
  },
};

export const sorts = ['popular', 'youtubers'] as const;
export type Sort = typeof sorts[number];

export const sortLabels: {
  [key in Sort]: string;
} = {
  popular: '인기순',
  youtubers: '유튜버 리뷰순',
};
