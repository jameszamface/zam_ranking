import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@completed_tutorials_key';

export async function restoreCompletedTutorialIds() {
  return JSON.parse((await AsyncStorage.getItem(key)) || '[]') as number[];
}

export async function saveCompletedTutorialId(id: string | number) {
  const completedTutorialIds = await restoreCompletedTutorialIds();

  // 중복 제거
  const newCompletedTutorialIds = addItemWithoutDuplications(
    completedTutorialIds,
    id,
  );

  AsyncStorage.setItem(key, JSON.stringify(newCompletedTutorialIds));
}

const addItemWithoutDuplications = <T extends string | number>(
  array: Array<T>,
  item: T,
) => {
  const set = new Set(array);
  set.add(item);
  return [...set];
};

// AsyncStorage.removeItem(key);