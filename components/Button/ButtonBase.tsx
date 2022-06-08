import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';

interface ContainerSize {
  width?: number;
  height?: number;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  fontSize?: number;
}

export interface ButtonProps extends ContainerSize {
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
  ...containerSize
}: ButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress && onPress(children)}>
      <Container style={[containerStyle, containerSize]}>
        <Text style={[textStyle]}>{children}</Text>
      </Container>
    </TouchableWithoutFeedback>
  );
};

ButtonBase.defaultProps = {
  paddingHorizontal: 10,
  paddingVertical: 5,
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

export default ButtonBase;
