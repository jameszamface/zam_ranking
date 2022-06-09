import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {ScrollTo} from '../ScrollViewWithScrollTo';

export interface TappableProps<T> {
  item: T;
  children?: ReactNode;
  onPress?: (category: T) => void;
  selectedColor?: string;
  selected?: boolean;
  scrollTo?: ScrollTo;
  style?: StyleProp<ViewStyle>;
}
