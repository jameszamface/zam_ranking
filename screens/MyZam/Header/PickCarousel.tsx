import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import CarouselBase from '../../../components/Carousel/CarouselBase';
import useMyPicks from '../../../hooks/useMyPicks';
import {Pick} from '../../../data/myPicks';
import PickComponent from '../../../components/Pick';
import styled from 'styled-components/native';

interface Props {
  name: string;
}

function PickCarousel({name}: Props) {
  const {myPicks, isLoading, isError, hasNextPage, fetchNextPicks} =
    useMyPicks();

  const onEdit = useCallback(() => {
    console.log('편집');
  }, []);

  const renderItem: ListRenderItem<Pick | string> = useCallback(({item}) => {
    if (item === 'register') {
      return null;
    }

    const pick = item as Pick;
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
      />
    );
  }, []);

  return (
    <Container>
      <CarouselBase
        data={['register', ...myPicks]}
        renderItem={renderItem}
        title={`${name}님의 Pick`}
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
