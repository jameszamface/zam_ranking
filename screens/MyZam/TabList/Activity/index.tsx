import React from 'react';
import styled from 'styled-components/native';
import WatchedCosmetics from './Carousels/WatchedCosmetics';
import LikedCosmetics from './Carousels/LikedCosmetics';

function Activity() {
  return (
    <Container>
      <WatchedCosmetics />
      <LikedCosmetics />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  background-color: #ffffff;
`;

export default Activity;
