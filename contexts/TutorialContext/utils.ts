import {ActionInfo} from '.';
import {ActionType} from './types/Action';
import {State} from './types/common';
import {Tutorial} from './types/Tutorial';

// 전체 튜토리얼에서 특정 스크린의 모든 튜토리얼을 검색하는 함수입니다.
const findScreenTutorials = (tutorials: Tutorial[], screen: string) => {
  return tutorials.filter(tutorial => tutorial.screen === screen);
};

// 전체 튜토리얼에서 원하는 ID를 사용하여 특정 튜토리얼을 검색하는 함수입니다.
// findScreenTutorial에서 부모 튜토리얼을 검색하기 위해 사용됩니다.
const findTutorialById = (tutorials: Tutorial[], id: string | number) => {
  return tutorials.find(tutorial => tutorial.id === id);
};

const checkParentTutorialCompleted = (
  tutorials: Tutorial[],
  id?: string | number,
) => {
  if (id === undefined) return true;
  const tutorial = findTutorialById(tutorials, id);
  return tutorial?.state === State.Complete;
};

const findExecutableTutorials = (
  screen: string,
  tutorials: Tutorial[],
  completedTutorialIds: (string | number)[],
) => {
  const screenTutorials = findScreenTutorials(tutorials, screen);
  return screenTutorials.filter(
    tutorial =>
      !completedTutorialIds.includes(tutorial.id) &&
      checkParentTutorialCompleted(tutorials, tutorial.parentId),
  );
};

// 특정 스크린에서 실행되어야 할 튜토리얼을 검색합니다.
// 우선순위: 부모 튜토리얼 완료 여부 > 인덱스
export const findExcutableTutorial = (
  tutorials: Tutorial[],
  screen: string,
  completedTutorialIds: (string | number)[],
) => {
  const excutableTutorials = findExecutableTutorials(
    screen,
    tutorials,
    completedTutorialIds,
  );

  if (!excutableTutorials || excutableTutorials.length === 0) return;
  return excutableTutorials[0];
};

export const getPendingActions = (tutorial: Tutorial) => {
  const {actions} = tutorial;
  return actions.filter(action => action.state !== State.Complete);
};

export const getFirstPendingActionInfo = (tutorial: Tutorial) => {
  const {actions} = tutorial;
  const index = actions.findIndex(action => action.state !== State.Complete);
  if (index === -1) return;
  return {
    action: actions[index],
    step: index,
  };
};

// 첫 번째 팬딩 액션을 완료로 표시하고 다음 액션을 반환합니다.
export const completePendingActionInfo = (
  tutorial: Tutorial,
  actionInfoFromProp?: ActionInfo,
) => {
  const actionInfo = actionInfoFromProp || getFirstPendingActionInfo(tutorial);
  if (!actionInfo || !actionInfo.action) return;
  const {actions} = tutorial;
  const {step: index, action} = actionInfo;

  action.state = State.Complete;

  const nextIndex = index + 1;
  const nextAction = actions[nextIndex];
  if (!nextAction) return;

  return {
    action: nextAction,
    step: nextIndex,
  };
};

export const isAutoHide = (actionInfo: ActionInfo) => {
  const {action} = actionInfo;
  return Boolean(
    (action.type === ActionType.Manual &&
      !action.duration &&
      !action.modal?.button) ||
      (action.duration && !action.modal?.button),
  );
};

export const convertAbsoluteValue = (
  maxAbsoluteValue: number,
  value?: number,
) => {
  if (value === undefined) return;
  return value <= 1 ? maxAbsoluteValue * value : value;
};
