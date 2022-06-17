import {Action, ActionType} from './types/Action';
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
  if (!id) return true;
  const tutorial = findTutorialById(tutorials, id);
  return tutorial?.state === State.Complete;
};

const findExecutableTutorials = (
  tutorials: Tutorial[],
  completedTutorialIds: (string | number)[],
) => {
  return tutorials.filter(
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
  const screenTutorials = findScreenTutorials(tutorials, screen);
  const excutableTutorials = findExecutableTutorials(
    screenTutorials,
    completedTutorialIds,
  );

  if (!excutableTutorials || excutableTutorials.length === 0) return;
  return excutableTutorials[0];
};

export const getPendingActions = (tutorial: Tutorial) => {
  const {actions} = tutorial;
  return actions.filter(action => action.state === State.Pending);
};

export const getLastPendingAction = (tutorial: Tutorial) => {
  const {actions} = tutorial;
  return actions.find(action => action.state === State.Pending);
};

// 타입이 Manual인 액션까지 순차적으로 실행하는 함수입니다.
export const execActions = (
  pendingActions: Action[],
  resolve: (action: Action) => void,
  reject: () => void,
) => {
  if (pendingActions.length === 0) {
    reject();
    return;
  }

  Promise.all(
    pendingActions.map(pendingAction => {
      if (pendingAction.type === ActionType.Manual) {
        throw new Error('다음 액션은 상대방의 응답을 기다려야 합니다.');
      }
      resolve(pendingAction);
    }),
  ).catch(() => reject());
};
