import {Dictionary} from 'lodash';
import {products} from '../data/products';

interface FetchProductsProps {
  selectedCategoryIds: Dictionary<string>;
  sort: string;
  cursor?: number;
}

export const fetchProducts = async ({
  selectedCategoryIds,
  sort,
  cursor,
}: FetchProductsProps) => {
  console.log('fetchProducts', selectedCategoryIds, sort);
  const isLast = Math.random() < 0.85;
  return {
    cursor: isLast ? undefined : (cursor || 0) + 1,
    products: products.map(productWithoutId => ({
      ...productWithoutId,
      id: Math.floor(Math.random() * 100000),
    })),
  };
};
