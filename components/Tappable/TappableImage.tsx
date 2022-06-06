import React, {useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import useLayout from '../../hooks/useLayout';
import {TappableProps} from './types';

interface Props<T> extends TappableProps<T> {
  item: T;
  image?: string;
  backgroundColor?: string;
}

function TappableImage<T>({
  item,
  image,
  backgroundColor = '#ffffff',
  selectedColor = '#000000',
  selected,
  children,
  onPress: _onPress,
  scrollTo,
  style,
}: Props<T>) {
  const {layout, onLayout} = useLayout();

  const onPress = () => {
    _onPress && _onPress(item);
  };

  useEffect(() => {
    if (!selected || !layout || !scrollTo) {
      return;
    }
    scrollTo({x: layout.x}, {delay: 500, duration: 500});
  }, [selected, scrollTo, layout]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container
        style={style}
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
  horzontalGap?: number;
  verticalGap?: number;
}>`
  height: 100px;
  width: 75px;
  margin-right: ${props => props.horzontalGap || 0}px;
  margin-bottom: ${props => props.verticalGap || 0}px;
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

export default TappableImage;
