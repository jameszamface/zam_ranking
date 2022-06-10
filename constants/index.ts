import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const evalScoreDictionary = {
  1: '별로',
  2: '보통',
  3: '만족',
} as const;
