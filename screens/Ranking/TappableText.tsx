import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native';
import styled from 'styled-components/native';
import {Category} from '../../hooks/useCategories';

interface Props {
  category: Category;
  children?: string;
  selected?: boolean;
  style?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextStyle>;
  showIndicator?: boolean;
  onPress?: (category: Category) => void;
}

function TappableText({
  category,
  children,
  selected,
  style,
  textStyle,
  showIndicator,
  onPress: _onPress,
}: Props) {
  const onPress = () => {
    _onPress && _onPress(category);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container
        style={style}
        selected={selected}
        showIndicator={showIndicator}>
        <Text selected={selected} style={textStyle}>
          {children}
        </Text>
      </Container>
    </TouchableWithoutFeedback>
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
