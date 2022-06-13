import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import styled from 'styled-components/native';
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
      <Shopping />
      <PickCarousel name="보틀친구곽튭2" />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
`;

export default Header;
