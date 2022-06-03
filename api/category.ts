import categories from '../data/categories';

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

export const fetchCategories = async () => {
  return {
    categories1: categories.filter(category => category.cdEtc2 === '0'),
    categories2: categories.filter(category => category.cdEtc2 === '1'),
    categories3: categories.filter(category => category.cdEtc2 === '2'),
  };
};
