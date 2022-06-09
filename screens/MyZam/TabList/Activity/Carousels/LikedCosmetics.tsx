import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import CarouselBase from '../../../../../components/Carousel/CarouselBase';
import {LikedCosmetic} from '../../../../../data/activity';
import {useLikedCosmetics} from '../../../../../hooks/useActivities';

function LikedCosmetics() {
  const {likedCosmetics} = useLikedCosmetics();

  const renderItem: ListRenderItem<LikedCosmetic> = useCallback(() => null, []);

  return (
    <CarouselBase
      title="찜한 제품"
      data={likedCosmetics}
      renderItem={renderItem}
    />
  );
}

export default LikedCosmetics;
