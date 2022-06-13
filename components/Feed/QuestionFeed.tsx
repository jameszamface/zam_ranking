import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import Text from '../Text';

function QuestionFeed<T>({
  image,
  note,
  item,
  onPress: onPressFromProps,
}: FeedProps<T>) {
  const onPress = () => {
    onPressFromProps && onPressFromProps(item);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <Text bold marginBottom={5}>
          질문
        </Text>
        {image && (
          <ImageContainer>
            <Image source={{uri: image}} />
          </ImageContainer>
        )}
        {note && (
          <Text numberOfLines={8} ellipsizeMode="tail">
            {note}
          </Text>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  background-color: #f2e55c;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
`;

const ImageContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const Image = styled(FastImage)`
  width: 50%;
  aspect-ratio: 1;
  border-radius: 5px;
`;

export default QuestionFeed;
