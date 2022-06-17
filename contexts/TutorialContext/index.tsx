import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {restoreCompletedTutorialIds} from './store';
import {TutorialContextProps} from './types';
import {Tutorial} from './types/Tutorial';
import {Action} from './types/Action';
import {Dictionary} from 'lodash';
import {State} from './types/common';
import {
  execActions,
  findExcutableTutorial,
  getLastPendingAction,
  getPendingActions,
} from './utils';
import {tutorials} from '../../data/turoials';

interface Props {
  screen: string;
}

const TutorialContext = createContext<Partial<TutorialContextProps>>({});

// 랜더링과 관련없는 정보는 전역 변수로 관리합니다.
let completedTutorialIds: (string | number)[];
const tutorialsInProcess: Dictionary<Tutorial> = {};

// 튜토리얼이 필요한 스크린을 withTutorial로 래핑하기 위해 사용됩니다.
function TutorialProvider({children, screen}: PropsWithChildren<Props>) {
  // 튜토리얼에는 모달 내 확인 버튼을 터치하면 완료되는 액션(자동 액션)이 있는 반면, 화면 내 특정 동작을 수행해야 완료되는 액션(수동 액션)이 있습니다.
  // 액션이 있다는 것은 튜토리얼이 스크린에 표시되고 있다는 의미입니다. 수동 액션인 경우(튜토리얼이 사라지고 사용자의 동작이 요구되는 경우), undefined가 됩니다.
  const [action, setAction] = useState<Action>();

  const _removeAction = useCallback(() => {
    setAction(undefined);
  }, []);

  const _triggerAction = useCallback((action: Action) => {
    setAction(action);
  }, []);

  // 모달, 이미지 등은 액션 정보를 알고 있기 때문에, 현재 보여주고 있는 액션의 ID를 담아 호출할 수 있습니다.
  // 수동 액션은 사용자가 정해진 액션(버튼 터치 등)을 완료했을 때 children에서(버튼 터치 핸들러) 액션이 완료되었다는 것을 직접 알려주어야 합니다.
  // children의 버튼 터치 핸들러는 액션 ID를 미리 알고 있어야 합니다.
  const completeActionWithId = useCallback(
    (id: string | number) => {
      const tutorial = tutorialsInProcess[screen];
      if (!tutorial) return;

      const lastAction = getLastPendingAction(tutorial);
      if (!lastAction || lastAction.id !== id) return;

      lastAction.state = State.Complete;

      const remainingPendingActions = getPendingActions(tutorial);
      execActions(remainingPendingActions, _triggerAction, _removeAction);
    },
    [_removeAction, _triggerAction, screen],
  );

  useEffect(() => {
    (async () => {
      await initCompletedTutorialIds();

      const tutorial = findExcutableTutorial(
        tutorials,
        screen,
        completedTutorialIds,
      );

      if (!tutorial) return;

      // 현재 진행중인 튜토리얼로 등록
      tutorialsInProcess[screen] = tutorial;

      // Pending 상태인 액션 순차실행
      const pendingActions = getPendingActions(tutorial);
      execActions(pendingActions, _triggerAction, _removeAction);
    })();
  }, [_removeAction, _triggerAction, screen]);

  return (
    <TutorialContext.Provider
      value={useMemo(() => ({completeActionWithId}), [completeActionWithId])}>
      {children}
      {/* TODO: action를 모달, 이미지, 커버 컴포넌트에 전송 */}
    </TutorialContext.Provider>
  );
}

const initCompletedTutorialIds = async () => {
  if (completedTutorialIds) return;
  completedTutorialIds = await restoreCompletedTutorialIds();
};

export function useTutorial() {
  return useContext(TutorialContext) as TutorialContextProps;
}

export function withTuturial({children, screen}: PropsWithChildren<Props>) {
  return <TutorialProvider screen={screen}>{children}</TutorialProvider>;
}

export default TutorialProvider;
