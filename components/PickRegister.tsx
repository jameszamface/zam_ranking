import React from 'react';
import styled from 'styled-components/native';
import BorderButton from './Button/BorderButton';
import Text from './Text';

interface Props {
  title: string;
  backgroundColor?: string;
  onRegister?: () => void;
}

function PickRegister({title, backgroundColor = '#ffffff', onRegister}: Props) {
  return (
    <Container backgroundColor={backgroundColor}>
      <Text fontSize={15} bold lineHeihgt={20}>
        {title}
      </Text>
      <BorderButton
        color="#fe35d9"
        borderColor="#fe35d9"
        borderRadius={15}
        onPress={onRegister}
        height={30}
        width={100}>
        등록하기
      </BorderButton>
    </Container>
  );
}

const Container = styled.View<{backgroundColor: string}>`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-color: ${props => props.backgroundColor};
  padding: 15px 12px;
  justify-content: space-between;
`;

export default PickRegister;
