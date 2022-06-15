import _ from 'lodash';
import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {width} from '../constants';
import isEqual from 'react-fast-compare';
import styled from 'styled-components/native';

const propsSplitter = [
  'data',
  'numColumns',
  'onEndReached',
  'keyExtractor',
  'scrollEventThrottle',
  'onEndReachedThreshold',
  'scrollEnabled',
  'onScroll',
  'onLayout',
  'onRefresh',
  'refreshControl',
  'renderItem',
  'style',
] as const;

interface Props {
  gap?: number;
}

interface State<ItemT> {
  splittedData: ItemT[][] | undefined;
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

  ItemSeparatorComponent = () => {
    if (!this.props.gap) return null;
    return <Separator gap={this.props.gap} />;
  };

  componentDidMount() {
    this.setState({
      splittedData: splitArray(this.props.data, this.props.numColumns),
    });
  }

  componentDidUpdate(prevProps: FlatListProps<ItemT> & Props) {
    if (isEqual(prevProps, this.props)) return false;

    this.childProps = _.omit(this.props, propsSplitter);
    this.parentProps = _.pick(this.props, propsSplitter);

    this.setState({
      splittedData: splitArray(this.props.data, this.props.numColumns),
    });
  }

  renderFlatList: ListRenderItem<ItemT[]> = ({item: data, index}) => {
    const {numColumns = 1} = this.props;
    return (
      <FlatList
        {...this.childProps}
        ref={null}
        style={{
          width: this.childWidth,
          marginLeft: this.props.gap,
        }}
        data={data}
        key={index}
        scrollEnabled={false}
        listKey={String(index)}
        // index를 사용하지 않는다면 this.props.renderItem을 그대로 넘겨주어도 된다.
        renderItem={({item, index: childIndex, separators}) => {
          if (!this.props.renderItem) return null;
          return this.props.renderItem({
            item,
            index: index + numColumns * childIndex,
            separators,
          });
        }}
        ItemSeparatorComponent={this.ItemSeparatorComponent}
      />
    );
  };

  keyExtractor = (item: ItemT[], index: number) => String(index);

  render() {
    return (
      <FlatList
        {...this.parentProps}
        data={this.state?.splittedData}
        renderItem={this.renderFlatList}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const Separator = styled.View<{gap: number}>`
  height: ${props => props.gap || 0}px;
`;

function splitArray<T>(arr?: readonly T[] | null, splitCount = 1) {
  return arr?.reduce<T[][]>((acc, cur, i) => {
    const basket = acc[i % splitCount];
    if (!basket) {
      acc.push([cur]);
    } else {
      basket.push(cur);
    }
    return acc;
  }, []);
}

export default Masonry;
