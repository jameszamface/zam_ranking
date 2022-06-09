import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import CarouselBase from '../../../../../components/Carousel/CarouselBase';
import SimpleProduct from '../../../../../components/Product/SimpleProduct';
import {WatchedCosmetic} from '../../../../../data/activity';
import {useWatchedCosmetics} from '../../../../../hooks/useActivities';
import {productConfig} from './config';

const title = '최근 본 제품';

function WatchedCosmetics() {
  const {watchedCosmetics} = useWatchedCosmetics();

  const onPress = useCallback((product?: WatchedCosmetic) => {
    console.log(title, product?.goodsNm);
  }, []);

  const renderItem: ListRenderItem<WatchedCosmetic> = useCallback(
    ({item: product}) => (
      <SimpleProduct
        image={productConfig.image}
        brand={product.goodsBrand}
        name={product.goodsNm}
        item={product}
        onPress={onPress}
      />
    ),
    [onPress],
  );

  return (
    <CarouselBase
      title={title}
      data={watchedCosmetics}
      renderItem={renderItem}
      gap={10}
    />
  );
}

export default WatchedCosmetics;
