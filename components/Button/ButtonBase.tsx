import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import {SizeProps} from './types';

export interface ButtonProps {
  children: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (children: string) => void;
}

const ButtonBase = ({
  children,
  containerStyle,
  textStyle,
  onPress,
}: ButtonProps & SizeProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress && onPress(children)}>
      <Container style={containerStyle}>
        <Text style={textStyle}>{children}</Text>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View<{width?: number; height?: number}>`
  justify-content: center;
  align-items: center;
`;

export default ButtonBase;
