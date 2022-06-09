import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import CarouselBase from '../../../../../components/Carousel/CarouselBase';
import {Video} from '../../../../../data/activity';
import {useScrapVideos} from '../../../../../hooks/useActivities';

function ScrapVideos() {
  const {scrapVideos} = useScrapVideos();

  const renderItem: ListRenderItem<Video> = useCallback(() => null, []);

  return (
    <CarouselBase
      title="스크랩한 영상"
      data={scrapVideos}
      renderItem={renderItem}
    />
  );
}

export default ScrapVideos;
