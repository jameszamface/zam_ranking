import {ViewStyle} from 'react-native';
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
} = {
  categories: {
    '0': {
      type: 'image',
      style: {
        paddingTop: 10,
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
};
