import React from 'react';
import styled from 'styled-components/native';
import WatchedCosmetics from './Carousels/WatchedCosmetics';
import LikedCosmetics from './Carousels/LikedCosmetics';
import ScrapVideos from './Carousels/ScrapVideos';
import WatchedVideos from './Carousels/WatchedVideos';

function Activity() {
  return (
    <Container>
      <WatchedCosmetics />
      <WatchedVideos />
      <ScrapVideos />
      <LikedCosmetics />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  background-color: #ffffff;
`;

export default Activity;
