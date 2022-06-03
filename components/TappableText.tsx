import React from 'react';
import {StyleProp, TextStyle, ViewProps} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children?: string;
  selected?: boolean;
  style?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextStyle>;
  showIndicator?: boolean;
}

function TappableText({
  children,
  selected,
  style,
  textStyle,
  showIndicator,
}: Props) {
  return (
    <Container style={style} selected={selected} showIndicator={showIndicator}>
      <Text style={textStyle}>{children}</Text>
    </Container>
  );
}

const Container = styled.View<{selected?: boolean; showIndicator?: boolean}>`
  height: 30px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-bottom-color: #000000;
  border-bottom-width: ${props =>
    props.selected && props.showIndicator ? 3 : 0}px;
  box-sizing: border-box;
`;

const Text = styled.Text<{selected?: boolean}>`
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
`;

export default TappableText;
