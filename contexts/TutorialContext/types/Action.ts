import {State} from '.';

export enum ActionType {
  Auto = 0, // 트리거되고 duration 이후, state가 완료 상태로 변경됩니다.
  Manual, // children에서 직접 완료 신호를 주어야 state가 완료 상태로 변경됩니다.
}

export interface Action {
  id: number;
  type: ActionType;
  state: State;
  duration: number; // millisecond
}
