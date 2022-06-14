import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import CircleImage from '../../../components/Cricle/ImageCircle';
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
  const style = useAnimatedStyle(() => {
    const scale = interpolate(scrollTop.value, scrollInputRange, outputs.scale);
    const opacity = interpolate(
      scrollTop.value,
      scrollInputRange,
      outputs.opacity,
    );
    const translateY = scrollTop.value * 0.9;

    return {
      opacity,
      transform: [{translateY}, {scale: scale}],
    };
  }, [scrollTop]);

  return (
    <Container style={style} height={height}>
      <BackgroundImageContainer>
        <CircleImage size={width} image={backgroundImage} />
        <Dim height={height} />
      </BackgroundImageContainer>
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

export default Profile;
