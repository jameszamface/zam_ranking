import _, {Dictionary} from 'lodash';
import {useEffect, useMemo, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {fetchProducts} from '../api/product';
import {Product} from '../data/products';

interface Props {
  selectedCategoryIds: Dictionary<string>;
  sort: string;
}

function useProducts({selectedCategoryIds, sort}: Props) {
  const key = useMemo(
    () => [..._.keys(selectedCategoryIds), sort],
    [selectedCategoryIds, sort],
  );

  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery(
    key,
    ({pageParam}) =>
      fetchProducts({selectedCategoryIds, sort, cursor: pageParam}),
    {
      getNextPageParam: lastPage => lastPage.cursor,
      getPreviousPageParam: firstPage => firstPage.cursor,
    },
  );

  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    if (!data) {
      return;
    }
    setProducts(_.flatMap(data, 'products'));
  }, [data]);

  return {
    products,
    hasNextPage,
    fetchNextPage,
    isLoading: isFetching || isFetchingNextPage,
    isError,
  };
}

export default useProducts;
