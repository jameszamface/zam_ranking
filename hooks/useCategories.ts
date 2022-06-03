import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {fetchCategories} from '../api/category';

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

function useCategories() {
  const {data: allCategories} = useQuery('categories', fetchCategories);

  const [categories, setCategories] = useState<{
    categories1: Category[];
    categories2: Category[];
    categories3: Category[];
  }>();

  const [selectedCategory, setSelectedCategory] = useState<{
    category1: Category;
    category2: Category;
    category3: Category;
  }>();

  useEffect(() => {
    if (!allCategories) {
      return;
    }
    const categories1 = allCategories.categories1;
    const selectedCategory1 = allCategories?.categories1[0];

    const categories2 = allCategories.categories2?.filter(
      category => category.cdNote === selectedCategory1?.cdId,
    );
    const selectedCategory2 = categories2[0];

    const categories3 = allCategories.categories3?.filter(
      category => category.cdNote === selectedCategory2?.cdId,
    );
    const selectedCategory3 = categories3[0];

    setCategories({
      categories1,
      categories2,
      categories3,
    });

    setSelectedCategory({
      category1: selectedCategory1,
      category2: selectedCategory2,
      category3: selectedCategory3,
    });
  }, [allCategories]);

  const changeCategory = (category: Category) => {
    if (!allCategories) {
      return;
    }
    setCategories(prev => {
      if (!prev) {
        return;
      }

      if (category.cdEtc2 === '0') {
        const restoredCategory2 = restoreCategory2(category.cdId);
        const restoredCategory3 = restoreCategory3(restoredCategory2?.cdId);

        const categories2 = allCategories.categories2.filter(
          c => c.cdEtc2 === category.cdId,
        );
        const category2 = restoredCategory2 || categories2[0];

        const categories3 = allCategories.categories3.filter(
          c => c.cdEtc2 === category2.cdId,
        );
        const category3 = restoredCategory3 || categories3[0];

        setSelectedCategory({
          category1: category,
          category2,
          category3,
        });

        return {
          ...prev,
          categories2,
          categories3,
        };
      } else if (category.cdEtc2 === '1') {
        const restoredCategory3 = restoreCategory3(category.cdId);
        const categories3 = allCategories.categories3.filter(
          c => c.cdEtc2 === category.cdId,
        );
        const category3 = restoredCategory3 || categories3[0];

        setSelectedCategory(prevSelected => {
          if (!prevSelected) {
            return;
          }
          const {category1} = prevSelected;

          saveCategory2(category1.cdId, category);

          return {
            category1,
            category2: category,
            category3,
          };
        });

        return {
          ...prev,
          categories3,
        };
      } else if (category.cdEtc2 === '2') {
        setSelectedCategory(prevSelected => {
          if (!prevSelected) {
            return;
          }

          const {category2} = prevSelected;
          saveCategory3(category2.cdId, category);

          return {
            ...prevSelected,
            category3: category,
          };
        });
      }
      return prev;
    });
  };

  return {
    categories,
    selectedCategory,
    changeCategory,
  };
}

interface Dictionary<T> {
  [Key: string]: T;
}

const storedCategories2: Dictionary<Category | undefined> = {};
const storedCategories3: Dictionary<Category | undefined> = {};

const saveCategory2 = (category1Id: string, category2: Category) => {
  storedCategories2[category1Id] = category2;
};

const restoreCategory2 = (category1Id?: string) => {
  if (!category1Id) {
    return;
  }
  return storedCategories2[category1Id];
};

const saveCategory3 = (category2Id: string, category3: Category) => {
  storedCategories3[category2Id] = category3;
};

const restoreCategory3 = (category2Id?: string) => {
  if (!category2Id) {
    return;
  }
  return storedCategories3[category2Id];
};

export default useCategories;
