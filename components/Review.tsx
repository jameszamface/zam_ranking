import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {TouchableWithoutFeedback, View} from 'react-native';
import Text from './Text';
import RowContainer from './RowContainer';
import ColorCircle from './Cricle/ColorCircle';
import {Eval} from '../data/myReviews';
import Tag from './Tag';
import PurchaseReview from '../icons/PurchaseReview';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props<T> {
  image?: string;
  brand: string;
  name: string;
  color: {
    string: string;
    description: string;
  };
  score: number;
  evals: Eval[];
  note?: string;
  date: string;
  tags?: string[];
  purchased?: boolean;
  item?: T;
  onPress?: (item?: T) => void;
}

function Review<T>({
  image,
  brand,
  name,
  color,
  score,
  evals,
  note,
  date,
  tags,
  purchased,
  item,
  onPress: onPressFromProps,
}: Props<T>) {
  const onPress = () => {
    onPressFromProps && onPressFromProps(item);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <Product image={image} brand={brand} name={name} color={color} />
        <Score score={score} purchased={purchased} />
        <Evals evals={evals} />
        <Tags tags={tags} />
        {note && <Text>{note}</Text>}
        <Text color="#666666">{date.replace(/-/gi, '.')}</Text>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  width: 100%;
  border-color: #cccccc;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
`;

const ProductContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

const Image = styled(FastImage)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: #eeeeee;
  margin-right: 15px;
`;

const Product = ({
  brand,
  name,
  image,
  color,
}: {
  brand: string;
  name: string;
  image?: string;
  color: {
    string: string;
    description: string;
  };
}) => (
  <ProductContainer>
    <Image source={{uri: image}} />
    <View>
      <Text>{`[${brand}] ${name}`}</Text>
      <RowContainer>
        <ColorCircle size={10} marginRight={10} color={color.string} />
        <Text color="#666666">{color.description}</Text>
      </RowContainer>
    </View>
  </ProductContainer>
);

const Evals = ({evals}: {evals?: Eval[]}) => {
  if (!evals) return null;
  return (
    <RowContainer>
      {evals.map(([evalName, evalScore], index) => {
        if (!evalName || !evalScore) return null;
        const isLast = index === evals.length - 1;
        return (
          <Text key={index}>
            <Text color="#666666">{evalName}</Text>
            <Text>{` ${evalScore}`}</Text>
            {!isLast ? <Text>{' | '}</Text> : null}
          </Text>
        );
      })}
    </RowContainer>
  );
};

const Tags = ({tags}: {tags?: string[]}) => {
  if (!tags) return null;
  return (
    <RowContainer>
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </RowContainer>
  );
};

const Score = ({score, purchased}: {score: number; purchased?: boolean}) => {
  return (
    <RowContainer>
      {purchased && <PurchaseReview />}
      <AntDesign name="star" size={15} color="#f0d83e" />
      <Text>{score.toFixed(1)}</Text>
    </RowContainer>
  );
};

export default Review;
