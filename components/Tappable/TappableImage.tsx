import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {TappableProps} from './types';

interface Props<T> extends TappableProps<T> {
  item: T;
  image?: string;
  backgroundColor?: string;
}

function CategoryButton<T>({
  item,
  image,
  backgroundColor = '#ffffff',
  selectedColor = '#000000',
  selected,
  children,
  onPress: _onPress,
}: Props<T>) {
  const onPress = () => {
    _onPress && _onPress(item);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container
        backgroundColor={backgroundColor}
        selectedColor={selectedColor}
        selected={selected}>
        <Image source={{uri: image}} />
        <NameContainer>
          <Name selected={selected}>{children}</Name>
        </NameContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View<{
  backgroundColor: string;
  selectedColor: string;
  selected?: boolean;
}>`
  height: 100px;
  width: 75px;
  border-radius: 3px;
  background-color: ${props =>
    props.selected ? '#000000' : props.backgroundColor};
  overflow: hidden;
`;

const Image = styled(FastImage)`
  width: 100%;
  flex: 1;
`;

const NameContainer = styled.View`
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const Name = styled.Text<{selected?: boolean}>`
  color: ${props => (props.selected ? '#ffffff' : '#000000')};
`;

export default CategoryButton;
