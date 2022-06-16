import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {restoreCompletedTutorialIds, saveCompletedTutorialId} from './store';
import {TutorialContextProps} from './types';
import {Tutorial} from './types/Tutorial';

const TutorialContext = createContext<Partial<TutorialContextProps>>({});

// 컨텍스트는 앱 생명주기 동안 언마운트되지 않기 때문에, 랜더링과 관련없는 정보는 전역 변수로 관리합니다.
let tutorials: Tutorial[] = []; // react-query로 전환?
let completedTutorialIds: number[] = [];

// SafeAreaProvider, QueryClientProvider, NavigationContainer 안에 위치해야 합니다.
function TutorialProvider({children}: PropsWithChildren<{}>) {
  useEffect(() => {
    initTutorial();
  }, []);

  const getTutorial = useCallback(async (screen: string) => {
    // TODO: tutorials에서 완료된 튜토리얼을 필터링
    // TODO: tutorials에서 screen 속성이 파라미터로 전달받은 screen과 동일한 스크린 객체 반환
    return [];
  }, []);

  const triggerAction = useCallback(async (action: Action) => {
    // TODO: action의 내용대로 모달, 이미지 등을 띄운거나 변경한다.
  }, []);

  const completeAction = useCallback(
    async (tutorialId: number, actionId: number) => {
      // TODO: 튜토리얼 객체 추출
      // TODO: 해당 액션의 state를 State.Complete로 변경
      // TODO: 다음 액션을 트리거시킨다.
    },
    [],
  );

  const value = useMemo(
    () => ({
      getTutorial,
      triggerAction,
      completeTutorial: saveCompletedTutorialId,
      completeAction,
    }),
    [completeAction, getTutorial, triggerAction],
  );

  return (
    <TutorialContext.Provider value={value}>
      {children}
      {/* TODO: 모달, 이미지, 커버 등 */}
    </TutorialContext.Provider>
  );
}

// TODO: 서버로 부터 tutorials 수신 (react-query 사용?)
// TODO: Async Storage로 부터 완료된 튜토리얼 ID 복구 (서버로 부터 복구해야 할 수도 있다.)
async function initTutorial() {
  // TODO: Promise.allSettled로 동시에 처리
  tutorials = [];
  completedTutorialIds = await restoreCompletedTutorialIds();
}

export function useTutorial() {
  return useContext(TutorialContext) as TutorialContextProps;
}

export default TutorialProvider;
