import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components/native';
import {ActionType, Modal as ModaType} from '../types/Action';
import {Rectangle, Size} from '../types/common';
import {width as screenWidth, height as screenHeight} from '../../../constants';
import Text from '../../../components/Text';
import BorderButton from '../../../components/Button/BorderButton';
import {Text as ModalText} from '../types/common';
import {StyleProp, TextStyle} from 'react-native';
import {useTutorial} from '..';
import {convertAbsoluteValue} from '../utils';

function Modal(props: ModaType) {
  const {actionInfo, completeActionWithId, hideAction} = useTutorial();
  const {
    position: positionFromProp,
    size: sizeFromProp,
    topImage,
    texts,
    textStyle,
    bottomImage,
    button,
  } = props;
  const size = useMemo(() => {
    if (!sizeFromProp) return;
    const {width, height} = sizeFromProp;
    return {
      width: convertAbsoluteValue(screenWidth, width),
      height: convertAbsoluteValue(screenHeight, height),
    };
  }, [sizeFromProp]);

  const position = useMemo(() => {
    if (!positionFromProp) return;
    const {top, left, right, bottom} = positionFromProp;
    return {
      top: convertAbsoluteValue(screenHeight, top),
      left: convertAbsoluteValue(screenWidth, left),
      right: convertAbsoluteValue(screenWidth, right),
      bottom: convertAbsoluteValue(screenHeight, bottom),
    };
  }, [positionFromProp]);

  const onPress = useCallback(() => {
    if (!actionInfo) return;
    const {action} = actionInfo;
    if (action.type === ActionType.Auto) {
      completeActionWithId(action.id);
    } else {
      hideAction(0);
    }
  }, [actionInfo, completeActionWithId, hideAction]);

  return (
    <Container {...size} {...position} style={shadowStyle}>
      <TextContainer>
        {convertTextsToComponents(texts, textStyle)}
      </TextContainer>
      {button && (
        <BorderButton
          onPress={onPress}
          marginTop={15}
          containerStyle={button.containerStyle}
          textStyle={button.textStyle}>
          {button.text}
        </BorderButton>
      )}
    </Container>
  );
}

const Container = styled.View<Partial<Size> & Partial<Rectangle>>`
  position: absolute;
  align-items: center;
  padding: 25px 20px;
  background-color: #ffffff;
  border-radius: 15px;
  ${props => (props.width ? `width: ${props.width}px` : null)}
  ${props => (props.height ? `height: ${props.height}px` : null)}
  ${props => (props.top ? `top: ${props.top}px` : null)}
  ${props => (props.left ? `left: ${props.left}px` : null)}
  ${props => (props.right ? `right: ${props.right}px` : null)}
  ${props => (props.bottom ? `bottom: ${props.bottom}px` : null)}
`;

const TextContainer = styled.Text`
  width: 100%;
  text-align: center;
`;

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

const convertTextsToComponents = (
  texts: ModalText[],
  style?: StyleProp<TextStyle>,
) => {
  const result = texts.map((textInfo, index) => {
    if (typeof textInfo === 'string') {
      return (
        <Text key={`${textInfo}_${index}`} style={style}>
          {' '}
          {textInfo}
        </Text>
      );
    }
    return (
      <Text
        key={`${textInfo.text}_${index}`}
        style={style}
        color={textInfo.color}>
        {' '}
        {textInfo.text}
      </Text>
    );
  });

  return result;
};

export default Modal;
