import React from 'react';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import styled from 'styled-components/native';
import CircleImage from '../../../components/Cricle/ImageCircle';
import {width} from '../../../constants';
import {profileHeight} from '../config';

interface Props {
  scrollTop: SharedValue<number>;
  nickname: string;
  backgroundImage?: string;
  profileImage?: string;
  follower?: number;
  following?: number;
  stickers?: number;
}

function Profile({scrollTop, nickname, backgroundImage, profileImage}: Props) {
  const style = useAnimatedStyle(() => {
    const scale = 1 - Math.min(scrollTop.value / profileHeight, 0);
    const opacity = 1.3 - scrollTop.value / profileHeight;

    return {
      opacity,
      transform: [
        {translateY: scrollTop.value * 0.9},
        {scaleX: scale},
        {scaleY: scale},
      ],
    };
  }, [scrollTop]);

  return (
    <Container style={style}>
      <BackgroundImageContainer>
        <CircleImage size={width} image={backgroundImage} />
        <Dim />
      </BackgroundImageContainer>
    </Container>
  );
}

const Container = styled(Animated.View)`
  width: 100%;
  height: ${profileHeight}px;
  background-color: #ffffff;
`;

const BackgroundImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Dim = styled.View`
  position: absolute;
  width: 100%;
  height: ${profileHeight}px;
  background-color: #000000;
  opacity: 0.3;
`;

export default Profile;
