export interface FeedProps<T> {
  image?: string;
  note?: string;
  item?: T;
  onPress?: (feed?: T) => void;
}
