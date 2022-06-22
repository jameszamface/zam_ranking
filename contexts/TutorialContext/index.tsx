import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import {restoreCompletedTutorialIds, saveCompletedTutorialId} from './store';
import {TutorialContextProps} from './types';
import {Tutorial} from './types/Tutorial';
import {Dictionary} from 'lodash';
import {
  completePendingActionInfo,
  findExcutableTutorial,
  getFirstPendingActionInfo,
  isAutoHide,
} from './utils';
import {tutorials} from '../../data/turoials';
import Modal from './components/Modal';
import {Action} from './types/Action';
import reducer from './reducer';
import {View, StyleProp, ViewProps} from 'react-native';
import {isIOS} from '../../constants';
import useCovers from './hooks/useCovers';
import styled from 'styled-components/native';
import {FullCover} from './components/FullCover';
import isEqual from 'react-fast-compare';

export interface ActionInfo {
  action: Action;
  step: number; // actions에서 해당 action의 인덱스입니다.
  visible?: boolean;
}

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
  const [actionInfo, dispatchActionInfo] = useReducer(reducer, undefined);

  const {setAccessibleArea, Covers} = useCovers();

  const hideAction = useCallback((delay = 0) => {
    setTimeout(() => {
      dispatchActionInfo({type: 'HIDE'});
    }, delay);
  }, []);

  // 모달, 이미지 등은 액션 정보를 알고 있기 때문에, 현재 보여주고 있는 액션의 ID를 담아 호출할 수 있습니다.
  // 수동 액션은 사용자가 정해진 액션(버튼 터치 등)을 완료했을 때 children에서(버튼 터치 핸들러) 액션이 완료되었다는 것을 직접 알려주어야 합니다.
  // children의 버튼 터치 핸들러는 액션 ID를 미리 알고 있어야 합니다.
  // ID를 모른다면 completeActionWithStep 함수를 대신 사용할 수 있습니다.
  const completeActionWithId = useCallback(
    (id: string | number) => {
      // 터치 제한 영역을 제거합니다.
      setAccessibleArea(undefined);

      const tutorial = tutorialsInProcess[screen];
      if (!tutorial) return;

      const actionInfo = getFirstPendingActionInfo(tutorial);
      if (!actionInfo || actionInfo.action.id !== id) return;

      // 현재 액션을 완료로 표시하고 다음 액션을 가져옵니다.
      const nextActionInfo = completePendingActionInfo(tutorial, actionInfo);

      // 다음 액션이 없다면 해당 튜토리얼은 완료된 것입니다.
      if (!nextActionInfo) {
        saveCompletedTutorial(id, screen);
        dispatchActionInfo({type: 'REMOVE'});
        return;
      }

      // 그렇지 않다면 다음 액션을 로드합니다.
      dispatchActionInfo({type: 'SET', actionInfo: nextActionInfo});

      if (isAutoHide(nextActionInfo)) {
        hideAction(nextActionInfo.action.duration);
      }
    },
    [hideAction, screen, setAccessibleArea],
  );

  // 수동 액션은 스크린 내부에서 액션 ID를 알고 있어야 하기 때문에, step을 이용해서 액션을 완료할 수 있는 함수도 추가했습니다.
  // 실제 작업은 TutorialBlocker와 TutorialTrigger HOC에서 자동으로 처리합니다.
  const completeActionWithStep = useCallback(
    (step: number) => {
      if (!actionInfo || actionInfo.step !== step) return;
      completeActionWithId(actionInfo.action.id);
    },
    [actionInfo, completeActionWithId],
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

      // 현재 진행중인 튜토리얼로 등록합니다.
      tutorialsInProcess[screen] = tutorial;

      // 첫 번째 액션을 로드합니다.
      const actionInfo = getFirstPendingActionInfo(tutorial);
      if (!actionInfo) return;
      dispatchActionInfo({type: 'SET', actionInfo});

      if (isAutoHide(actionInfo)) {
        hideAction(actionInfo.action.duration);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TutorialContext.Provider
      value={useMemo(
        () => ({
          actionInfo,
          completeActionWithId,
          completeActionWithStep,
          screen,
          setAccessibleArea,
          hideAction,
        }),
        [
          completeActionWithId,
          completeActionWithStep,
          actionInfo,
          screen,
          setAccessibleArea,
          hideAction,
        ],
      )}>
      <Container>
        {children}
        {!actionInfo?.visible && Covers}
        {/* TODO: action를 모달, 이미지, 커버 컴포넌트에 전송 */}
        {actionInfo?.visible && actionInfo.action.modal?.button && (
          <FullCover />
        )}
        {actionInfo?.visible && actionInfo?.action.modal && (
          <Modal {...actionInfo.action.modal} actionInfo={actionInfo} />
        )}
      </Container>
    </TutorialContext.Provider>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// 완료한 튜토리얼 id를 전역 변수에 저장하는 함수입니다.
const initCompletedTutorialIds = async () => {
  if (completedTutorialIds) return;
  completedTutorialIds = await restoreCompletedTutorialIds();
};

// 완료한 튜토리얼을 전역 변수에 추가하고, 진행중인 튜토리얼에서 삭제하는 함수입니다.
const saveCompletedTutorial = async (id: string | number, screen: string) => {
  completedTutorialIds.push(id);
  saveCompletedTutorialId(id);
  delete tutorialsInProcess[screen];
};

// withTutorial로 래핑한 컴포넌트에서 튜토리얼 컨텍스트를 편하게 가져오기 위한 훅입니다.
export function useTutorial() {
  return useContext(TutorialContext) as TutorialContextProps;
}

// 튜토리얼을 사용하고자 하는 스크린과 해당 스크린의 모든 하위 트리에 정보를 전달하기 위한 HOC입니다.
export function withTutorial<T>(
  Element: (props: PropsWithChildren<T>) => JSX.Element,
  screen: string,
) {
  return function (props: PropsWithChildren<T>) {
    return (
      <TutorialProvider screen={screen}>{Element(props)}</TutorialProvider>
    );
  };
}

// 입력된 step과 튜토리얼의 step이 동일한 경우 child의 터치를 차단하는 HOC입니다.
export const TutorialBlocker = React.memo(
  ({
    children,
    id: idFromProp,
    step: stepFromProp,
    style,
  }: {
    children: ReactElement;
    id?: string | number;
    step?: number;
    style?: StyleProp<ViewProps>;
  }) => {
    const {actionInfo} = useTutorial();

    const block = useMemo(() => {
      if (!actionInfo || (!idFromProp && !stepFromProp)) return false;
      if (idFromProp && idFromProp === actionInfo.action.id) return true;
      if (stepFromProp && stepFromProp === actionInfo.step) return true;
    }, [actionInfo, idFromProp, stepFromProp]);

    return (
      <View
        style={[children.props.style, style]}
        pointerEvents={block ? 'none' : 'auto'}>
        {children}
      </View>
    );
  },
  isEqual,
);

/*
 * 입력된 id 또는 step이 현재 튜토링러의 현재 액션의 id 또는 step과 동일한 경우, 해당 액션의 완료 신호를 트리거하는 HOC입니다.
 * id가
 * 래핑 대상의 position이 absolute이거나, 크기가 비율인 경우 직접 스타일링해 주어어야 합니다.
 * blockOutside 속성은 각 스탭당 단 하나의 컴포넌트만 래핑되어야 합니다.
 * 버튼이 없고 duration이 설정되어 있는 경우 (스크린에 접근할 수 있고, 모달이 자동으로 사라지는 경우) blockOutside는 작동하지 않습니다.
 */
export const TutorialTrigger = React.memo(
  ({
    children,
    step: stepFromProp,
    id: idFromProp,
    blockOutside,
    style,
  }: {
    children: ReactElement;
    step?: number;
    id?: string | number;
    blockOutside?: boolean;
    style?: StyleProp<ViewProps>;
  }) => {
    const ref = useRef<View>(null);
    const size = useRef<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>();

    const {
      actionInfo,
      completeActionWithStep,
      completeActionWithId,
      setAccessibleArea,
    } = useTutorial();

    const onLayout = useCallback(() => {
      ref.current?.measure((x, y, width, height, pageX, pageY) => {
        size.current = {
          // iOS는 튜닝이 필요
          // eslint-disable-next-line prettier/prettier
        x: (isIOS && x <= pageX ? pageX : x) + (isIOS && x <= pageX ? 0 : pageX),
          y: pageY + (isIOS ? 0 : y),
          width,
          height,
        };
      });
    }, []);

    useEffect(() => {
      if (
        !actionInfo ||
        actionInfo.step !== stepFromProp ||
        isAutoHide(actionInfo) ||
        !blockOutside ||
        !size.current
      ) {
        return;
      }
      setAccessibleArea(size.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actionInfo]);

    const onTouchWithId = useCallback(() => {
      if (!actionInfo || actionInfo.action.id !== idFromProp) return;
      completeActionWithId(idFromProp);
    }, [actionInfo, completeActionWithId, idFromProp]);

    const onTouchWithStep = useCallback(() => {
      if (!actionInfo || actionInfo.step !== stepFromProp) return;
      completeActionWithStep(stepFromProp);
    }, [completeActionWithStep, actionInfo, stepFromProp]);

    const onTouchEvent = useMemo(() => {
      if (!actionInfo || (!idFromProp && !stepFromProp)) return;
      if (idFromProp && idFromProp === actionInfo.action.id) {
        return onTouchWithId;
      }
      if (stepFromProp && stepFromProp === actionInfo.step) {
        return onTouchWithStep;
      }
    }, [actionInfo, idFromProp, onTouchWithId, onTouchWithStep, stepFromProp]);

    return (
      <View
        style={[children.props.style, style]}
        ref={ref}
        onLayout={blockOutside ? onLayout : undefined}
        onTouchEnd={onTouchEvent}>
        {children}
      </View>
    );
  },
  isEqual,
);

export default TutorialProvider;
