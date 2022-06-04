export interface TappableProps<T> {
  item: T;
  children?: string;
  onPress?: (category: T) => void;
  selectedColor?: string;
  selected?: boolean;
}