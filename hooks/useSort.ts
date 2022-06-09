import {Dictionary} from 'lodash';
import {useCallback, useEffect, useRef, useState} from 'react';

function useSort<T>(defaultSort: T, linkedId?: string) {
  const storedSorts = useRef<Dictionary<T>>({}).current;

  const [sort, setSort] = useState<T>(
    restoreSort<T>(storedSorts, linkedId) || defaultSort,
  );

  useEffect(() => {
    setSort(restoreSort<T>(storedSorts, linkedId) || defaultSort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSort, linkedId]);

  const changeSort = useCallback(
    (newSort: T, _linkedId?: string) => {
      setSort(newSort);
      if (_linkedId) {
        saveSort(storedSorts, _linkedId, newSort);
      }
    },
    [storedSorts],
  );

  return {sort, changeSort};
}

const saveSort = <T>(store: Dictionary<T>, linkedId: string, sort: T) => {
  store[linkedId] = sort;
};

const restoreSort = <T>(store: Dictionary<T>, linkedId?: string) => {
  if (!linkedId) return;
  return store[linkedId] as T | undefined;
};

export default useSort;
