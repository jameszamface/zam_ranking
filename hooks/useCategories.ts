import {useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import {fetchCategories} from '../api/category';

interface Category {
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

function useCategories() {
  const {data: categories} = useQuery('categories', fetchCategories);

  const [selectedCategory1, setSelectedCategory1] = useState<
    Category | undefined
  >();

  const categories1 = useMemo(() => {
    const newCategories1 = categories?.filter(
      category => category.cdEtc2 === '0',
    );
    setSelectedCategory1(newCategories1 ? newCategories1[0] : undefined);
    return newCategories1;
  }, [categories]);

  const [selectedCategory2, setSelectedCategory2] = useState<
    Category | undefined
  >();

  const categories2 = useMemo(() => {
    const newCategories2 = categories?.filter(category => {
      return (
        selectedCategory1 &&
        category.cdEtc2 === '1' &&
        category.cdNote === selectedCategory1.cdId
      );
    });

    setSelectedCategory2(newCategories2 ? newCategories2[0] : undefined);
    return newCategories2;
  }, [categories, selectedCategory1]);

  const [selectedCategory3, setSelectedCategory3] = useState<
    Category | undefined
  >();

  const categories3 = useMemo(() => {
    const newCategories3 = categories?.filter(category => {
      return (
        selectedCategory2 &&
        category.cdEtc2 === '2' &&
        category.cdNote === selectedCategory2?.cdId
      );
    });

    setSelectedCategory3(newCategories3 ? newCategories3[0] : undefined);
    return newCategories3;
  }, [categories, selectedCategory2]);

  return {
    categories1,
    selectedCategory1,
    setSelectedCategory1,
    categories2,
    selectedCategory2,
    setSelectedCategory2,
    categories3,
    selectedCategory3,
    setSelectedCategory3,
  };
}

export default useCategories;
