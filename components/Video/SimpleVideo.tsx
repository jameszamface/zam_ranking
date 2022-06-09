import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import Text from '../Text';

interface Props<T> {
  thumbnail: {
    width: number;
    height: number;
    uri?: string;
  };
  name: string;
  title: string;
  item?: T;
  onPress?: (item?: T) => void;
}

function SimpleVideo<T>({
  thumbnail,
  name,
  title,
  item,
  onPress: onPressFromProps,
}: Props<T>) {
  const onPress = () => {
    onPressFromProps && onPressFromProps(item);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container width={thumbnail.width}>
        <Thumbnail
          source={{uri: thumbnail.uri}}
          width={thumbnail.width}
          height={thumbnail.height}
        />
        <TitleText numberOfLines={2} ellipsizeMode="tail" fontSize={14}>{title}</TitleText>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          fontSize={12}
          color="#cccccc">
          {name}
        </Text>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View<{width: number}>`
  width: ${props => props.width}px;
`;

const Thumbnail = styled(FastImage)<{width: number; height: number}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: #eeeeee;
  border-radius: 5px;
`;

const TitleText = styled(Text)`
  margin-top: 5px;
`;

export default SimpleVideo;
