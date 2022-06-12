import {Dictionary} from 'lodash';
import {StyleProp, ViewStyle} from 'react-native';

export interface CategoryOption {
  type: 'image' | 'text';
  showIndicator?: boolean;
  style?: ViewStyle;
}

export interface HeaderOptions {
  categories: Dictionary<CategoryOption>;
  sortLinkedDepth: string;
  imageStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<ViewStyle>;
  mainCategoryDepth: string;
}

export const headerOptions: HeaderOptions = {
  mainCategoryDepth: '0',
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
    },
    '2': {
      type: 'text',
      showIndicator: false,
      style: {
        paddingHorizontal: 5,
      },
    },
  },
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
