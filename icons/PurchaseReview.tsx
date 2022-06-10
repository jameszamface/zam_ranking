import React from 'react';
import styled from 'styled-components/native';
import Text from '../components/Text';

const PurchaseReviewIcon = () => (
  <Container>
    <Text color="#ffffff" fontSize={11}>
      구매리뷰
    </Text>
  </Container>
);

const Container = styled.View`
  padding: 5px;
  background-color: #ff32b1;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;

const alwaysEqual = () => true;

export default React.memo(PurchaseReviewIcon, alwaysEqual);
