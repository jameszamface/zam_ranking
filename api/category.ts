import categories from '../data/categories';
import _ from 'lodash';

export interface Category {
  cdDitc: number;
  cdEtc1: string; //'#fcf4ef',
  cdEtc2: string; // '0', // depth
  cdEtc3: string; // 'D', // parentId
  cdId: string; // 'D', // self Id
  cdNm: string; // '퍼스널컬러', // self name
  cdNote: string; // '',
  loc: string; // 'ko',
  ord: number; // 0,
  useYn: string; // 'Y',
}

export interface Categories {
  categories1: Category[];
  categories2: Category[];
  categories3: Category[];
}

export const fetchCategories = async () => {
  const depthGroupedCategories = _.groupBy(categories, 'cdEtc2');
  const categoryMap = _.mapValues(depthGroupedCategories, depthCategories =>
    _.groupBy(depthCategories, 'cdNote'),
  );
  const depths = Object.keys(depthGroupedCategories)
    .map(depth => Number(depth))
    // 숫자가 아닌 depth 제거
    .filter(depth => !Number.isNaN(depth))
    // 오름차순 정렬
    .sort((a, b) => Number(a) - Number(b));

  return {categoryMap, depths};
};
