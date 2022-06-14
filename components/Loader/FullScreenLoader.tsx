import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  isLoading?: boolean;
  color?: string;
}

function FullScreenLoader({isLoading, color}: Props) {
  return (
    <Container>
      {isLoading && <ActivityIndicator size="small" color={color} />}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default FullScreenLoader;
