import React from 'react';
import styled from 'styled-components/native';
import WatchedCosmetics from './Carousels/WatchedCosmetics';
import LikedCosmetics from './Carousels/LikedCosmetics';
import ScrapVideos from './Carousels/ScrapVideos';
import WatchedVideos from './Carousels/WatchedVideos';
import {TabProps} from '../types';

function Activity({minHeight=0}: TabProps) {
  return (
    <Container minHeight={minHeight}>
      <WatchedCosmetics />
      <WatchedVideos />
      <ScrapVideos />
      <LikedCosmetics />
    </Container>
  );
}

const Container = styled.View<{minHeight: number}>`
  padding-top: 15px;
  width: 100%;
  background-color: #ffffff;
  min-height: ${props => props.minHeight}px;
`;

export default Activity;
