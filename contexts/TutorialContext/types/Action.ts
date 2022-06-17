import {Button, Image, Position, Rectangle, Size, State, Text} from './common';

export enum ActionType {
  // 트리거되고 duration 이후, state가 완료 상태로 변경됩니다.
  // modal.button이 존재하는 경우, 무조건 Manual로 동작합니다.
  Auto = 0,
  Manual, // children에서 직접 완료 신호를 주어야 state가 완료 상태로 변경됩니다.
}

// 2.22 기획서 p.14에 튜토리얼 이탈시 처음부터 다시 시작한다고 했으므로, state가 State.Pending인 튜토리얼은 state가 State.Complete인 Action도 다시 트리거시킵니다.
export interface Action {
  id: string | number;
  type: ActionType;
  state?: State;
  duration: number; // millisecond 단위이고, modal.button이 존재하는 경우 무시됩니다.
  modal: Modal;
  image?: Image;
  // 첫 번째 Size는 좌상단, 두 번째 Size는 우하단 포인트이고, 두 개의 포인트로 터치 가능한 사각형 영역을 생성합니다.
  // 두 번째 Size가 첫 번째 Size의 우측 또는 상단에 있을 경우 touchableArea를 생성하지 않습니다.
  // 오직 한 개의 영역만 생성할 수 있습니다.
  touchableArea?: Rectangle;
  // touchableArea와 동일하지만 다수 영역을 생성할 수 있습니다.
  // untouchableArea가 우선합니다.
  untouchableAreas?: Rectangle[];
}

export interface Modal {
  size: Size;
  position: Position;
  topImage?: Image; // 텍스트 상단에 표시되는 이미지입니다. 이미지 사이즈는 모달 사이즈를 기준으로 합니다.
  text: Text;
  bottomImage?: Image; // 텍스트 하단에 표시되는 이미지입니다.
  button?: Button;
}

export type ActionCallback = (action: Action) => void;
