import {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {Category, fetchCategories} from '../api/category';
import {Dictionary} from '../constants/types';

function useCategories() {
  const {data: categoryData} = useQuery('categories', fetchCategories);

  interface CategoryInfo {
    categories: Category[][];
    selectedCategoryIds: string[];
  }

  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo>({
    categories: [],
    selectedCategoryIds: [],
  });

  const changeCategory = useCallback(
    (category: Category) => {
      const depthProp = Number(category.cdEtc2);
      if (!categoryData || Number.isNaN(depthProp)) {
        return;
      }

      const {depths, categoryMap} = categoryData;

      let parentId = category.cdNote;
      saveCategory(parentId, category);

      setCategoryInfo(prev => {
        const {
          categories: oldCategories,
          selectedCategoryIds: oldSelectedCategoryIds,
        } = prev;

        const newCategoryInfo: CategoryInfo = {
          categories: [],
          selectedCategoryIds: [],
        };

        let depth = 0;
        let depthCategories: Category[] | undefined;

        // 각 depth의 카테고리마다 최대 depth가 변하는 유동적인 상황을 가정했다.
        // depth가 어디서 끝나는지 모르기 때문에, 마지막 depth까지 반복하는 while 문을 사용한다.
        for (let i = 0; i < depths.length; i++) {
          depth = depths[i];

          // 이전 depth는 과거 정보를 그대로 사용하기 위한 플래그이다.
          const useOld = depth < depthProp;

          // 전체 테이블(categoryMap)에서 카테고리 리스트를 찾시 못 했다면, 마지막 depth인 것이다.
          depthCategories = useOld
            ? oldCategories[depth]
            : categoryMap[depth][parentId];

          if (!depthCategories) {
            break;
          }

          const selectedCategoryId = useOld
            ? oldSelectedCategoryIds[i]
            : restoreCategory(parentId) || depthCategories[0].cdId;

          parentId = selectedCategoryId || '';

          newCategoryInfo.categories.push(depthCategories);
          newCategoryInfo.selectedCategoryIds.push(selectedCategoryId);
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

    const {categoryMap, depths} = categoryData;
    const firstDepth = depths[0];
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
