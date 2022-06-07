import {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {Category, fetchCategories} from '../api/category';
import {Dictionary} from '../constants/types';

function useCategories() {
  const {data: categoryData} = useQuery('categories', fetchCategories);

  interface CategoryInfo {
    mainCategory?: [string, Category[]];
    etcCategories: [string, Category[]][];
    categories: Dictionary<Category[]>;
    selectedCategoryIds: Dictionary<string>;
    depths: string[];
  }

  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo>({
    etcCategories: [],
    selectedCategoryIds: {},
    categories: {},
    depths: [],
  });

  const changeCategory = useCallback(
    (category: Category) => {
      const depthProp = category.cdEtc2;
      if (!categoryData) {
        return;
      }

      const {allDepths, categoryMap} = categoryData;

      let parentId = category.cdNote;
      saveCategory(parentId, category);

      setCategoryInfo(prev => {
        const newCategoryInfo: CategoryInfo = {
          etcCategories: [],
          categories: {},
          selectedCategoryIds: {},
          depths: [],
        };

        // 각 depth의 카테고리마다 최대 depth가 변하는 유동적인 상황을 가정했다.
        // depth가 어디서 끝나는지 모르기 때문에, 마지막 depth까지 반복하는 while 문을 사용한다.
        for (let i = 0; i < allDepths.length; i++) {
          const depth = allDepths[i];
          const usePrevData = depth < depthProp;
          const isMainCategory = i === 0;

          // 전체 테이블(categoryMap)에서 카테고리 리스트를 찾시 못 했다면, 마지막 depth인 것이다.
          const depthCategories = usePrevData
            ? prev.categories[depth]
            : categoryMap[depth][parentId];

          if (!depthCategories) {
            break;
          }

          const selectedCategoryId = usePrevData
            ? prev.selectedCategoryIds[i]
            : restoreCategory(parentId) || depthCategories[0].cdId;

          parentId = selectedCategoryId || '';

          if (isMainCategory) {
            newCategoryInfo.mainCategory = [depth, depthCategories];
          } else {
            newCategoryInfo.etcCategories.push([depth, depthCategories]);
          }

          newCategoryInfo.categories[depth] = depthCategories;
          newCategoryInfo.selectedCategoryIds[depth] = selectedCategoryId;
          newCategoryInfo.depths.push(depth);
        }

        return newCategoryInfo;
      });
    },
    [categoryData],
  );

  useEffect(() => {
    if (!categoryData) {
      return;
    }

    const {categoryMap, allDepths} = categoryData;
    const firstDepth = allDepths[0];
    const rootParentId = ''; // 최상단 카테고리의 depth 값이다. (전체 데이터를 매핑하면서 root로 변경해도 될 것 같다.)

    // 전체 카테고리에서 가장 낮은 depth의 첫 번째 아이템을 선택했다고 가정한다.
    const category = categoryMap[firstDepth][rootParentId][0];
    changeCategory(category);
  }, [categoryData, changeCategory]);

  return {
    categoryInfo,
    changeCategory,
  };
}

// 선택된 카테고리에서 다시 선택된 자식 카테고리를 저장하고 가져오기 위해 사용된다.
const storedCategories: Dictionary<string | undefined> = {};

const saveCategory = (parentId: string, category: Category) => {
  storedCategories[parentId] = category.cdId;
};

const restoreCategory = (parentId?: string) => {
  return storedCategories[parentId || ''];
};

export default useCategories;
