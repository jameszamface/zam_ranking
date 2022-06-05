import {ScrollTo} from '../ScrollViewWithScrollTo';

export interface TappableProps<T> {
  item: T;
  children?: string;
  gap?: number;
  onPress?: (category: T) => void;
  selectedColor?: string;
  selected?: boolean;
  scrollTo?: ScrollTo;
}
