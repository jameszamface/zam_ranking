import React, { useCallback } from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components/native';
import RowContainer from '../../../components/RowContainer';
import Text from '../../../components/Text';

interface Props {
  carts?: number;
  orders?: number;
  points?: number;
}

function Shopping({carts = 0, orders = 0, points = 0}: Props) {
  const onCarts = useCallback(() => {
    console.log('장바구니');
  }, []);

  const onOrders = useCallback(() => {
    console.log('주문 배송');
  }, []);

  const onPoints = useCallback(() => {
    console.log('잼 포인트');
  }, []);
  return (
    <Container>
      <HeaderContainer>
        <Text fontSize={17} bold>
          나의 쇼핑
        </Text>
      </HeaderContainer>
      <ShoppingContainer>
        <CountButton label="장바구니" count={carts} onPress={onCarts} />
        <CountButton label="주문 배송" count={orders} onPress={onOrders} />
        <CountButton label="잼 포인트" count={points} onPress={onPoints} />
      </ShoppingContainer>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  background-color: #ffffff;
  padding: 20px 15px;
  border-top-width: 10px;
  border-top-color: #eeeeee;
`;

const HeaderContainer = styled(RowContainer)`
  justify-content: space-between;
  margin-bottom: 7px;
`;

const ShoppingContainer = styled(RowContainer)`
  width: 100%;
  padding: 15px 0px;
  border-radius: 5px;
  background-color: #eeeeee;
`;

const CountButton = ({
  label,
  count,
  onPress,
}: {
  label: string;
  count: number;
  onPress?: () => void;
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <CountButtonContainer>
        <Text fontSize={17} bold marginBottom={10}>
          {count}
        </Text>
        <Text>{label}</Text>
      </CountButtonContainer>
    </TouchableWithoutFeedback>
  );
};

const CountButtonContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export default Shopping;
