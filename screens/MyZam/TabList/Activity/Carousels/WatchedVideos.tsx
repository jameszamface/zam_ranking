import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import CarouselBase from '../../../../../components/Carousel/CarouselBase';
import {Video} from '../../../../../data/activity';
import {useWatchedVideos} from '../../../../../hooks/useActivities';

function WatchedVideos() {
  const {watchedVideos} = useWatchedVideos();

  const renderItem: ListRenderItem<Video> = useCallback(() => null, []);

  return (
    <CarouselBase
      title="최근 본 영상"
      data={watchedVideos}
      renderItem={renderItem}
    />
  );
}

export default WatchedVideos;
