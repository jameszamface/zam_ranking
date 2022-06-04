import React, {useCallback, useEffect, useRef, useState} from 'react';
import {LayoutChangeEvent, TouchableWithoutFeedback} from 'react-native';
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
  scrollTo,
}: Props<T>) {
  const [mounted, setMounted] = useState(false);
  const offsetXRef = useRef<number>(0);

  const onPress = () => {
    _onPress && _onPress(item);
  };

  useEffect(() => {
    if (!selected || !mounted || !scrollTo) {
      return;
    }
    scrollTo({x: offsetXRef.current}, {delay: 500, duration: 500});
  }, [selected, scrollTo, mounted]);

  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: {x},
      },
    }: LayoutChangeEvent) => {
      offsetXRef.current = x;
      setMounted(true);
    },
    [],
  );

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container
        onLayout={onLayout}
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
