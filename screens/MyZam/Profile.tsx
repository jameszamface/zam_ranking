import React from 'react';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import styled from 'styled-components/native';
import Text from '../../components/Text';
import {profileHeight} from './config';

interface Props {
  scrollTop: SharedValue<number>;
}

function Profile({scrollTop}: Props) {
  const style = useAnimatedStyle(
    () => ({
      transform: [{translateY: scrollTop.value}],
    }),
    [scrollTop],
  );
  return (
    <Container style={style}>
      <Text>Profile</Text>
    </Container>
  );
}

const Container = styled(Animated.View)`
  width: 100%;
  height: ${profileHeight}px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export default Profile;
