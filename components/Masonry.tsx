import _ from 'lodash';
import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {width} from '../constants';

const propsSplitter = [
  'data',
  'numColumns',
  'onEndReached',
  'keyExtractor',
  'scrollEventThrottle',
  'scrollEnabled',
] as const;

interface Props {
  gap?: number;
}

interface State<ItemT> {
  splittedData: ItemT[][];
}

class Masonry<ItemT> extends React.Component<
  FlatListProps<ItemT> & Props,
  State<ItemT>
> {
  childWidth: number;
  childProps: Omit<FlatListProps<ItemT>, typeof propsSplitter[number]>;
  parentProps: Pick<FlatListProps<ItemT>, typeof propsSplitter[number]>;

  constructor(props: FlatListProps<ItemT> & Props) {
    super(props);

    const {numColumns = 1, gap = 0} = this.props;
    this.childWidth = (width - gap * (numColumns + 1)) / numColumns;

    this.childProps = _.omit(this.props, propsSplitter);
    this.parentProps = _.pick(this.props, propsSplitter);
  }

  componentDidMount() {
    this.setState({
      splittedData: splitArray(this.props.data, this.props.numColumns),
    });
  }

  renderFlatList: ListRenderItem<ItemT[]> = ({item: data, index}) => {
    return (
      <FlatList
        {...this.childProps}
        style={{
          width: this.childWidth,
          marginLeft: this.props.gap,
        }}
        data={data}
        key={index}
        scrollEnabled={false}
        listKey={String(index)}
        renderItem={({item, index: childIndex, ...etc}) => {
          if (!this.props.renderItem) return null;
          return this.props.renderItem({
            item,
            index: index + childIndex,
            ...etc,
          });
        }}
      />
    );
  };

  render() {
    return (
      <FlatList
        {...this.parentProps}
        style={containerStyle}
        data={this.state?.splittedData}
        renderItem={this.renderFlatList}
        keyExtractor={(item: ItemT[], index: number) => String(index)}
      />
    );
  }
}

function splitArray<T>(arr?: readonly T[] | null, splitCount = 1) {
  if (!arr) return [];
  return arr.reduce<T[][]>(
    (acc, cur, i) => {
      acc[i % splitCount].push(cur);
      return acc;
    },
    [[], []],
  );
}

const containerStyle: StyleProp<ViewStyle> = {
  flex: 1,
  width: '100%',
};

export default Masonry;
