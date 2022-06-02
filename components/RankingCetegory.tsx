import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

interface Props {
  name: string;
  image: string;
  color: string;
}

function RankingCategory({name, image, color}: Props) {
  return (
    <Container backgroundColor={color}>
      <Image source={{uri: image}} />
      <NameContainer>{name}</NameContainer>
    </Container>
  );
}

const Container = styled.View<{backgroundColor?: string}>`
  height: 100px;
  width: 75px;
  border-radius: 3px;
  background-color: ${props => props.backgroundColor};
  overflow: hidden;
`;

const Image = styled(FastImage)`
  width: 100%;
  flex: 1;
`;

const NameContainer = styled.View`
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export default RankingCategory;
