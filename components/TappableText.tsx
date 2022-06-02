import React from 'react';
import {StyleProp, Text, TextStyle, ViewProps} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children?: string;
  selected?: boolean;
  style?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextStyle>;
}

function TappableText({children, selected, style, textStyle}: Props) {
  return (
    <Container style={style} selected={selected}>
      <Text style={textStyle}>{children}</Text>
    </Container>
  );
}

const Container = styled.View<{selected?: boolean}>`
  height: 30px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-bottom-color: #000000;
  border-bottom-width: ${props => (props.selected ? 3 : 0)}px;
  box-sizing: border-box;
`;

export default TappableText;
