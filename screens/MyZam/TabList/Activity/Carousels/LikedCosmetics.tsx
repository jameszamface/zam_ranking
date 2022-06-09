import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import CarouselBase from '../../../../../components/Carousel/CarouselBase';
import SimpleProduct from '../../../../../components/Product/SimpleProduct';
import {LikedCosmetic} from '../../../../../data/activity';
import {useLikedCosmetics} from '../../../../../hooks/useActivities';
import {productConfig} from './config';

const title = '찜한 제품';

function LikedCosmetics() {
  const {likedCosmetics} = useLikedCosmetics();

  const onPress = useCallback((product?: LikedCosmetic) => {
    console.log(title, product?.C05);
  }, []);

  const renderItem: ListRenderItem<LikedCosmetic> = useCallback(
    ({item: product}) => (
      <SimpleProduct
        image={productConfig.image}
        brand={product.C05}
        name={product.C03}
        item={product}
        onPress={onPress}
        color={{
          string: `#${product.rgbCd}`,
          description: product.chasuNm,
        }}
      />
    ),
    [onPress],
  );

  return (
    <CarouselBase
      title={title}
      data={likedCosmetics}
      renderItem={renderItem}
      gap={10}
    />
  );
}

export default LikedCosmetics;
