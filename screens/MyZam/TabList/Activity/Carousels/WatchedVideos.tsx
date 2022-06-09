import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import CarouselBase from '../../../../../components/Carousel/CarouselBase';
import SimpleVideo from '../../../../../components/Video/SimpleVideo';
import {Video} from '../../../../../data/activity';
import {useWatchedVideos} from '../../../../../hooks/useActivities';
import {videoConfig} from './config';

const title = '최근 본 영상';

function WatchedVideos() {
  const {watchedVideos} = useWatchedVideos();

  const onPress = useCallback((video?: Video) => {
    console.log(title, video?.C03);
  }, []);

  const renderItem: ListRenderItem<Video> = useCallback(
    ({item: video}) => {
      return (
        <SimpleVideo
          thumbnail={videoConfig.video}
          title={video.C03}
          name={video.C07}
          item={video}
          onPress={onPress}
        />
      );
    },
    [onPress],
  );

  return (
    <CarouselBase
      title={title}
      data={watchedVideos}
      renderItem={renderItem}
      gap={10}
    />
  );
}

export default WatchedVideos;
