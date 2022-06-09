import React from 'react';
import styled from 'styled-components/native';
import Text from './Text';

interface Props {
  children: string;
  backgroundColor?: string;
  color?: string;
  padding?: number;
}

const Tag = ({
  children,
  backgroundColor = '#cccccc',
  color = '#000000',
  padding = 5,
}: Props) => {
  return (
    <Container backgroundColor={backgroundColor} padding={padding}>
      <Text color={color}>{children}</Text>
    </Container>
  );
};

const Container = styled.View<{backgroundColor: string; padding: number}>`
  padding: ${props => props.padding}px;
  background-color: ${props => props.backgroundColor};
  border-radius: 3px;
  justify-content: center;
`;

export default Tag;
