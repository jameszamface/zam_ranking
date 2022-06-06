import {StyleProp, ViewProps} from 'react-native';
import {ScrollTo} from '../ScrollViewWithScrollTo';

export interface TappableProps<T> {
  item: T;
  children?: string;
  onPress?: (category: T) => void;
  selectedColor?: string;
  selected?: boolean;
  scrollTo?: ScrollTo;
  style?: StyleProp<ViewProps>;
}
