import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native';
import styled from 'styled-components/native';
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
  selected,
  style,
  textStyle,
  showIndicator,
  selectedColor = '#000000',
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
}>`
  height: 30px;
  padding: 5px;
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
