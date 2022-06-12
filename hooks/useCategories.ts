import {Dictionary} from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {Category, CategoryMap, fetchCategories} from '../api/category';
import {HeaderOptions, headerOptions} from '../screens/Ranking/config';

export interface CategoryInfo {
  mainCategory?: [string, Category[]];
  etcCategories: [string, Category[]][];
  categories: Dictionary<Category[]>;
  selectedCategoryIds: Dictionary<string>;
  depths: string[];
}

function useCategories() {
  const {data: categoryData} = useQuery('categories', fetchCategories);

  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo>({
    etcCategories: [],
    selectedCategoryIds: {},
    categories: {},
    depths: [],
  });

  const changeCategory = useCallback(
    (category: Category) => {
      const depthInProps = category.cdEtc2;
      if (!categoryData) {
        return;
      }

      const {allDepths, categoryMap} = categoryData;

      const parentId = category.cdNote;
      saveCategory(parentId, category);

      setCategoryInfo(prevCategoryInfo => {
        const newCategoryInfo = makeCategoryInfo({
          headerOptions,
          categoryMap,
          prevCategoryInfo,
          allDepths,
          depthInProps,
        });

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

const makeCategoryInfo = ({
  headerOptions,
  categoryMap,
  prevCategoryInfo,
  allDepths,
  depthInProps,
  parentId = '',
  depthIndex = 0,
  categoryInfoInProcess,
}: {
  headerOptions: HeaderOptions;
  categoryMap: CategoryMap;
  prevCategoryInfo: CategoryInfo;
  allDepths: string[];
  depthInProps: string;
  // 재귀호출을 위한 변수들이다. 해당 함수를 호출할 때 입력되지 않는다.
  parentId?: string;
  depthIndex?: number;
  categoryInfoInProcess?: CategoryInfo;
}): CategoryInfo => {
  const newCategoryInfo: CategoryInfo = categoryInfoInProcess || {
    etcCategories: [],
    categories: {},
    selectedCategoryIds: {},
    depths: [],
  };

  // 최대 depth를 넘어서 makeCategoryInfo가 실행되면 undefined일 수 있다.
  const depth = allDepths[depthIndex];

  const usePrevData = depth < depthInProps;
  const isMainCategory = depth === headerOptions.mainCategoryDepth;

  if (!depth) return newCategoryInfo;

  // 전체 테이블(categoryMap)에서 카테고리 리스트를 찾시 못 했다면, undefined이고, 마지막 depth인 것이다.
  const depthCategories = usePrevData
    ? prevCategoryInfo.categories[depth]
    : categoryMap[depth][parentId];

  if (!depthCategories) return newCategoryInfo;

  const selectedCategoryId = usePrevData
    ? prevCategoryInfo.selectedCategoryIds[depthIndex]
    : restoreCategory(parentId) || depthCategories[0].cdId;

  if (isMainCategory) {
    newCategoryInfo.mainCategory = [depth, depthCategories];
  } else {
    newCategoryInfo.etcCategories.push([depth, depthCategories]);
  }

  newCategoryInfo.categories[depth] = depthCategories;
  newCategoryInfo.selectedCategoryIds[depth] = selectedCategoryId;
  newCategoryInfo.depths.push(depth);

  return makeCategoryInfo({
    headerOptions,
    categoryMap,
    prevCategoryInfo,
    parentId: selectedCategoryId,
    allDepths,
    depthInProps,
    depthIndex: depthIndex + 1,
    categoryInfoInProcess: newCategoryInfo,
  });
};

export default useCategories;
