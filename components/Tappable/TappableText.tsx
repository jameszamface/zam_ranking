import React, {useEffect} from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native';
import styled from 'styled-components/native';
import useLayout from '../../hooks/useLayout';
import {TappableProps} from './types';

interface Props<T> extends TappableProps<T> {
  style?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextStyle>;
  showIndicator?: boolean;
  onPress?: (category: T) => void;
}

function TappableText<T>({
  item,
  children,
  gap,
  selected,
  style,
  textStyle,
  showIndicator,
  selectedColor = '#000000',
  onPress: _onPress,
  scrollTo,
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
        onLayout={onLayout}
        gap={gap}
        style={style}
        selected={selected}
        selectedColor={selectedColor}
        showIndicator={showIndicator}>
        <Text
          selectedColor={selectedColor}
          selected={selected}
          style={textStyle}>
          {children}
        </Text>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View<{
  selectedColor: string;
  selected?: boolean;
  showIndicator?: boolean;
  gap?: number;
}>`
  height: 30px;
  padding: 5px;
  margin-right: ${props => props.gap || 0}px;
  margin-bottom: ${props => props.gap || 0}px;
  justify-content: center;
  align-items: center;
  border-bottom-color: ${props => props.selectedColor};
  border-bottom-width: ${props =>
    props.selected && props.showIndicator ? 3 : 0}px;
  box-sizing: border-box;
`;

const Text = styled.Text<{selectedColor: string; selected?: boolean}>`
  color: ${props => props.selectedColor};
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
`;

export default TappableText;
