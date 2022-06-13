import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import Text from '../Text';
import {FeedProps} from './types';

interface Props<T> extends FeedProps<T> {
  ratio?: number;
}

function PictureFeed<T>({
  image,
  ratio = 1,
  note,
  item,
  onPress: onPressFromProps,
}: Props<T>) {
  const onPress = () => {
    onPressFromProps && onPressFromProps(item);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <Image source={{uri: image}} ratio={ratio} />
        {note && (
          <NoteContainer>
            <Text numberOfLines={8} ellipsizeMode="tail">
              {note}
            </Text>
          </NoteContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
`;

const Image = styled(FastImage)<{ratio: number}>`
  width: 100%;
  aspect-ratio: ${props => props.ratio};
`;

const NoteContainer = styled.View`
  padding: 5px;
`;

export default PictureFeed;
