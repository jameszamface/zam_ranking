import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import CarouselBase from '../../../../../components/Carousel/CarouselBase';
import {WatchedCosmetic} from '../../../../../data/activity';
import {useWatchedCosmetics} from '../../../../../hooks/useActivities';

function WatchedCosmetics() {
  const {watchedCosmetics} = useWatchedCosmetics();

  const renderItem: ListRenderItem<WatchedCosmetic> = useCallback(
    () => null,
    [],
  );

  return (
    <CarouselBase
      title="최근 본 영상"
      data={watchedCosmetics}
      renderItem={renderItem}
    />
  );
}

export default WatchedCosmetics;
