import categories from '../data/categories';
import _, {Dictionary} from 'lodash';

// export interface Category {
//   cdDitc: number;
//   cdEtc1: string; //'#fcf4ef',
//   cdEtc2: string; // '0', // depth
//   cdEtc3: string; // 'D', // parentId
//   cdId: string; // 'D', // self Id
//   cdNm: string; // '퍼스널컬러', // self name
//   cdNote: string; // '',
//   loc: string; // 'ko',
//   ord: number; // 0,
//   useYn: string; // 'Y',
// }

export type Category = typeof categories[number];

export interface Categories {
  categories1: Category[];
  categories2: Category[];
  categories3: Category[];
}

export const fetchCategories = async (): Promise<{
  categoryMap: CategoryMap;
  allDepths: string[];
}> => {
  const depthGroupedCategories = _.groupBy(categories, 'cdEtc2');
  const categoryMap = _.mapValues(depthGroupedCategories, depthCategories =>
    _.groupBy(depthCategories, 'cdNote'),
  );
  const allDepths = Object.keys(depthGroupedCategories)
    // 오름차순 정렬
    .sort((a, b) => Number(a) - Number(b));

  return {categoryMap, allDepths};
};

export type CategoryMap = {
  [depth: string]: Dictionary<Category[]>;
};
