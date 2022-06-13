import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import styled from 'styled-components/native';
import Intro from './Intro';
import PickCarousel from './PickCarousel';
import Profile from './Profile';
import Shopping from './Shopping';

interface Props {
  scrollTop: SharedValue<number>;
}

function Header({scrollTop}: Props) {
  return (
    <Container>
      <Profile scrollTop={scrollTop} />
      <Intro tags={['복합성', '가을웜트루', '속쌍']} intro="곡튜브입니당~.~" />
      <Shopping />
      <PickCarousel name="보틀친구곽튭2" />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
`;

export default Header;
