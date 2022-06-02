import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

interface Props {
  name: string;
  image: string;
  color: string;
  selected?: boolean;
}

function CategoryButton({name, image, color, selected}: Props) {
  return (
    <Container backgroundColor={color} selected={selected}>
      <Image source={{uri: image}} />
      <NameContainer>
        <Name selected={selected}>{name}</Name>
      </NameContainer>
    </Container>
  );
}

const Container = styled.View<{backgroundColor: string; selected?: boolean}>`
  height: 100px;
  width: 75px;
  border-radius: 3px;
  background-color: ${props =>
    props.selected ? '#000000' : props.backgroundColor};
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

const Name = styled.Text<{selected?: boolean}>`
  color: ${props => (props.selected ? '#ffffff' : '#000000')};
`;

export default CategoryButton;
