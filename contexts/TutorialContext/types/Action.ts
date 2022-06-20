import {StyleProp, TextStyle} from 'react-native';
import {Button, Image, Position, Size, State, Text} from './common';

export enum ActionType {
  Auto = 0, // 튜토리얼 컨텍스트의 모달의 확인 버튼 등에 의해 완료 상태로 변경되는 액션입니다.
  Manual, // 스크린의 버튼 등 children 내부의 특정 동작에 의해 적접 완료 상태로 변경되는 액션입니다.
}

// 2.22 기획서 p.14에 튜토리얼 이탈시 처음부터 다시 시작한다고 했으므로, state가 State.Pending인 튜토리얼은 state가 State.Complete인 Action도 다시 트리거시킵니다.
export interface Action {
  id: string | number;
  type: ActionType;
  state?: State;
  duration?: number; // millisecond 단위이고, 타입이 Auto이거나 modal.button이 존재하는 경우 무시됩니다.
  modal?: Modal;
  image?: Image;
}

export interface Modal {
  texts: Text[];
  textStyle?: StyleProp<TextStyle>;
  position?: Position;
  size?: Partial<Size>;
  topImage?: Image; // 텍스트 상단에 표시되는 이미지입니다. 이미지 사이즈는 모달 사이즈를 기준으로 합니다.
  bottomImage?: Image; // 텍스트 하단에 표시되는 이미지입니다.
  button?: Button;
}
