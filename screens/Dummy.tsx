import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

function Dummy() {
  const navigation = useNavigation();
  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => navigation.push('Dummy')}>
        <Text>Dummy</Text>
      </TouchableWithoutFeedback>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Dummy;
