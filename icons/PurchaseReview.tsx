import React from 'react';
import styled from 'styled-components/native';
import Text from '../components/Text';

const PurchaseReviewIcon = () => (
  <Container>
    <Text color="#ffffff" fontSize={10}>
      구매리뷰
    </Text>
  </Container>
);

const Container = styled.View`
  padding: 3px;
  background-color: #ff32b1;
  justify-content: center;
  align-items: center;
`;

const alwaysEqual = () => true;

export default React.memo(PurchaseReviewIcon, alwaysEqual);
