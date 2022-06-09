import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {Product as ProductType} from '../../data/products';
import Text from '../Text';

interface Props {
  product: ProductType;
  width: number;
  imageHeight: number;
  gap: number;
}

function Product({product, width, imageHeight, gap}: Props) {
  return (
    <Container width={width} gap={gap}>
      <ImageContainer>
        <Image source={{uri: ''}} width={width} height={imageHeight} />
        <ColorInfoContainer>
          <ColorCircle color={product.color.string} />
          <Text color="#666666">{`${product.color.number} ${product.color.description}`}</Text>
        </ColorInfoContainer>
      </ImageContainer>
      <Contents>
        <Text numberOfLines={2}>
          <Text bold>{product.type.name}</Text>
          <Text>{` ${product.type.detail}`}</Text>
        </Text>
      </Contents>
      <Footer>
        <Text color="#333333">{product.youtubers}</Text>
      </Footer>
    </Container>
  );
}

const Container = styled.View<{width: number; gap: number}>`
  width: ${props => props.width}px;
  margin-left: ${props => props.gap}px;
  margin-bottom: 15px;
`;

const RowContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled.View`
  background-color: #cccccc;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ColorInfoContainer = styled(RowContainer)`
  justify-content: center;
`;
const ColorCircle = styled.View<{color: string}>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.color};
`;

const Image = styled(FastImage)<{width: number; height: number}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const Contents = styled(RowContainer)`
  justify-content: space-between;
`;

const Footer = styled(RowContainer)``;

export default Product;
