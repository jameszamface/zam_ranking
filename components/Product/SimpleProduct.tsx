import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import ColorCircle from '../Cricle/ColorCircle';
import Text from '../Text';
import {TouchableWithoutFeedback} from 'react-native';

interface Props<T> {
  id: number;
  image: {
    width: number;
    height: number;
    uri?: string;
  };
  brand: string;
  name: string;
  color?: {
    string: string;
    description: string;
  };
  item: T;
  onPress?: (item?: T) => void;
}

function SimpleProduct<T>({
  image,
  color,
  brand,
  name,
  item,
  onPress: onPresFromProps,
}: Props<T>) {
  const onPress = () => {
    onPresFromProps && onPresFromProps(item);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container width={image.width}>
        <Image
          source={{uri: image.uri}}
          width={image.width}
          height={image.height}
        />
        {color && (
          <ColorInfoContainer>
            <ColorCircle size={10} marginRight={5} color={color.string} />
            <Text numberOfLines={1} ellipsizeMode="tail" color="#cccccc">
              {color.description}
            </Text>
          </ColorInfoContainer>
        )}
        <BrandNameText
          numberOfLines={2}
          ellipsizeMode="tail">{`[${brand}] ${name}`}</BrandNameText>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View<{width: number}>`
  width: ${props => props.width}px;
`;

const Image = styled(FastImage)<{width: number; height: number}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: #dedede;
`;

const ColorInfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const BrandNameText = styled(Text)`
  margin-top: 5px;
`;

export default SimpleProduct;
