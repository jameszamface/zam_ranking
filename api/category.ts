import categories from '../data/categories';

export const fetchCategories = async () => {
  return {
    categories1: categories.filter(category => category.cdEtc2 === '0'),
    categories2: categories.filter(category => category.cdEtc2 === '1'),
    categories3: categories.filter(category => category.cdEtc2 === '2'),
  };
};
