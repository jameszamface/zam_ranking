import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

function ZamFeed() {
  return (
    <Container>
      <Text>Zam Feed</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ZamFeed;
