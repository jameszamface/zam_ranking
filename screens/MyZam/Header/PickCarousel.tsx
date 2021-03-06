import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import CarouselBase from '../../../components/Carousel/CarouselBase';
import useMyPicks from '../../../hooks/useMyPicks';
import {Pick} from '../../../data/myPicks';
import PickComponent from '../../../components/Pick';
import styled from 'styled-components/native';
import PickRegister from '../../../components/PickRegister';
import {pickRegisterTitle} from '../config';

interface Props {
  nickname?: string;
}

function PickCarousel({nickname}: Props) {
  const {myPicks, isLoading, isError, hasNextPage, fetchNextPicks} =
    useMyPicks();

  const onEdit = useCallback(() => {
    console.log('편집');
  }, []);

  const onRegister = useCallback(() => {
    console.log('등록하기');
  }, []);

  const onPickPressed = useCallback((pick?: Pick) => {
    console.log('Pick', pick?.goods.goodsNm);
  }, []);

  const renderItem: ListRenderItem<Pick | 'register'> = useCallback(
    ({item: pick}) => {
      if (pick === 'register') {
        return (
          <PickRegister title={pickRegisterTitle} onRegister={onRegister} />
        );
      }

      const {goods} = pick;
      return (
        <PickComponent
          title={pick.title}
          goods={{
            name: goods.goodsNm,
            color: {
              number: `#${goods.rgbCd}`,
              string: goods.colorNm,
            },
          }}
          item={pick}
          onPress={onPickPressed}
        />
      );
    },
    [onPickPressed, onRegister],
  );

  return (
    <Container>
      <CarouselBase
        data={['register', ...myPicks]}
        renderItem={renderItem}
        title={`${nickname}님의 Pick`}
        titleSize={17}
        titleColor="#ffffff"
        headerMargin={20}
        rightButton="편집"
        onRightButton={onEdit}
        gap={15}
      />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #000000;
  align-items: center;
`;

export default PickCarousel;
