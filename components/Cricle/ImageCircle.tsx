import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

interface Props {
  size: number;
  image?: string;
}

function CircleImage({size, image}: Props) {
  return <Image size={size} source={{uri: image}} />;
}

const Image = styled(FastImage)<{size: number}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
`;

export default CircleImage;
