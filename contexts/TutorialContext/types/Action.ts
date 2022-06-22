import {StyleProp, TextStyle} from 'react-native';
import {Button, Image, Position, Size, State, Text} from './common';

export enum ActionType {
  Auto = 0, // 튜토리얼 컨텍스트의 모달의 확인 버튼 등에 의해 완료 상태로 변경되는 액션입니다.
  Manual, // 스크린의 버튼 등 children 내부의 특정 동작에 의해 적접 완료 상태로 변경되는 액션입니다.
}

// 2.22 기획서 p.14에 튜토리얼 이탈시 처음부터 다시 시작한다고 했으므로, state가 State.Pending인 튜토리얼은 state가 State.Complete인 Action도 다시 트리거시킵니다.
// 액션의 ID는 특정 버튼과 매핑됩니다. (스크린 내에서 고유해야 합니다!)
export interface Action {
  id: string | number;
  type: ActionType;
  state?: State;
  duration?: number; // millisecond 단위이고, 타입이 Auto이거나 modal.button이 존재하는 경우 무시됩니다.
  modal?: Modal;
  image?: Image;
  outside?: {
    block: boolean;
    color: string;
  };
  // 액션이 완료되었을 때 이동할 스크린입니다.
  // 튜토리얼의 마지막 액션에 입력하는 것을 추천합니다.
  moveTo?: {
    screen: string;
    props?: object;
  };
}

export interface Modal {
  texts: Text[];
  textStyle?: StyleProp<TextStyle>;
  position?: Position;
  size?: Partial<Size>;
  topImage?: Image; // 텍스트 상단에 표시되는 이미지입니다. 이미지 사이즈는 모달 사이즈를 기준으로 합니다.
  bottomImage?: Image; // 텍스트 하단에 표시되는 이미지입니다.
  button?: Button;
  // moveTo가 있으면 버튼을 눌렀을 때 moveTo에 지정된 스크린으로 props와 함께 이동합니다.
  backgroundColor?: string;
}
