import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import styled from 'styled-components/native';
import Text from '../../components/Text';
import {profileHeight} from './config';
import Profile from './Profile';

interface Props {
  scrollTop: SharedValue<number>;
}

function Header({scrollTop}: Props) {
  return (
    <Container>
      <Profile scrollTop={scrollTop} />
      <Temp>
        <Text>Header</Text>
      </Temp>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
`;

const Temp = styled.View`
  width: 100%;
  /* height: 450px; */
  justify-content: center;
  align-items: center;
  background-color: green;
`;

export default Header;
