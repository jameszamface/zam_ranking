import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  isLoading?: boolean;
  height?: number;
  paddingBottom?: number;
  color?: string;
}

function ListLoader({
  isLoading,
  height,
  paddingBottom,
  color = '#aaaaaa',
}: Props) {
  return (
    <Container height={height} paddingBottom={paddingBottom}>
      {isLoading && <ActivityIndicator size="small" color={color} />}
    </Container>
  );
}

const Container = styled.View<{
  height?: number;
  paddingBottom?: number;
}>`
  width: 100%;
  height: ${props => props.height || 50}px;
  flex: 1;
  padding-bottom: ${props => props.paddingBottom || 0}px;
`;

export default ListLoader;
