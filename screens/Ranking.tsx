import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

function Ranking() {
  return (
    <Container>
      <Text>Ranking</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Ranking;
