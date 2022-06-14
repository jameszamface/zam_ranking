import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import BorderButtonOrigin from '../../../components/Button/BorderButton';
import TextButtonOrigin from '../../../components/Button/TextButton';
import CircleImage from '../../../components/Cricle/ImageCircle';
import RowContainerOrigin from '../../../components/RowContainer';
import Text from '../../../components/Text';
import {width} from '../../../constants';

interface Props {
  scrollTop: SharedValue<number>;
  nickname: string;
  backgroundImage?: string;
  profileImage?: string;
  follower?: number;
  following?: number;
  stickers?: number;
  height?: number;
  scrollTopMaxOverflow?: number;
}

interface ButtonProps {
  children: string;
  marginRight?: number;
  onPress?: (children: string) => void;
}

const outputs = {
  scale: [2, 1, 1, 1],
  opacity: [1, 1, 1, 0],
};

function Profile({
  scrollTop,
  nickname,
  backgroundImage,
  profileImage,
  height = 0,
  scrollTopMaxOverflow = 0,
}: Props) {
  const scrollInputRange = [scrollTopMaxOverflow, 0, height / 3, height];
  const containerStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollTop.value, scrollInputRange, outputs.scale);
    const opacity = interpolate(
      scrollTop.value,
      scrollInputRange,
      outputs.opacity,
    );
    const translateY = scrollTop.value * 0.8;

    return {
      opacity,
      transform: [{translateY}, {scale: scale}],
    };
  }, [scrollTop]);

  const foregroundStyle = useAnimatedStyle(() => {
    const translateY = scrollTop.value * 0.15;
    return {
      transform: [{translateY}],
    };
  }, [scrollTop]);

  return (
    <Container style={containerStyle} height={height}>
      <BackgroundImageContainer>
        <CircleImage size={width} image={backgroundImage} />
      </BackgroundImageContainer>
      <Dim height={height} />
      <ForegroundContainer style={foregroundStyle} height={height}>
        <CircleImage size={100} image={profileImage} />
        <Text color="#ffffff" bold fontSize={17} marginTop={20}>
          {nickname}
        </Text>
        <RowContainer marginTop={10}>
          <TextButton marginRight={15}>팔로워</TextButton>
          <TextButton marginRight={15}>팔로워</TextButton>
          <TextButton>잼스티커</TextButton>
        </RowContainer>
        <RowContainer marginTop={25}>
          <BorderButton marginRight={15}>나의 찜</BorderButton>
          <BorderButton>퍼컬 매칭</BorderButton>
        </RowContainer>
      </ForegroundContainer>
    </Container>
  );
}

const Container = styled(Animated.View)<{height: number}>`
  width: 100%;
  height: ${props => props.height}px;
  background-color: #ffffff;
`;

const BackgroundImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Dim = styled.View<{height: number}>`
  position: absolute;
  width: 100%;
  height: ${props => props.height}px;
  background-color: #000000;
  opacity: 0.3;
`;

const ForegroundContainer = styled(Animated.View)<{height: number}>`
  position: absolute;
  width: 100%;
  height: ${props => props.height}px;
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled(RowContainerOrigin)`
  justify-content: center;
`;

const TextButton = ({children, marginRight, onPress}: ButtonProps) => {
  return (
    <TextButtonOrigin
      color="#ffffff"
      marginRight={marginRight}
      fontSize={14}
      bold
      onPress={onPress}>
      {children}
    </TextButtonOrigin>
  );
};

const BorderButton = ({children, marginRight, onPress}: ButtonProps) => {
  return (
    <BorderButtonOrigin
      color="#ffffff"
      height={30}
      borderRadius={15}
      marginRight={marginRight}
      paddingHorizontal={15}
      onPress={onPress}>
      {children}
    </BorderButtonOrigin>
  );
};

export default Profile;
