import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export enum State {
  Pending = 0, // 트리거 전
  // Progress, // 진행중
  Complete,
}

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

// width와 height는 비율(0~1) 또는 절대값(1~number)을 값으로 가질 수 있습니다.
// 0인 경우 undefined로 설정됩니다.
export interface Size {
  width: number;
  height: number;
}

export interface Rectangle {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

// 각 position 요소는 비율(0~1) 또는 절대값(1~number)을 값으로 가질 수 있습니다.
// top과 bottom이 동시에 입력되면 top이 우선합니다.
// left와 right가 동시에 입력되면 right가 우선합니다.
// top과 bottom 또는 left와 right가 모두 입력되지 않으면 상하/좌우 가운데 정렬됩니다.
// 엘리먼트의 좌상단이 position에 위치하게 됩니다.
export type Position = Partial<Rectangle>;

export type Text =
  | string
  | (
      | string
      | {
          color: string;
          text: string;
        }
    )[];

// image: jpeg, png, gif 등 Image 컴포넌트로 랜더링할 수 있는 이미지입니다.
// svg: react-native-svg 라이브러리로 랜더링할 수 있는 이미지입니다.
// lottie: lottie-react-native 라이브러리로 랜더링할 수 있는 이미지입니다.
export type ImageType = 'image' | 'svg' | 'lottie';

// 모달 안에서 표시되는 이미지와 모달과 같은 레벨로 모달보다 높은 z-index로 표시되는 이미지가 있을 수 있습니다.
export interface Image {
  size: Size;
  position: Position;
  uri: string;
  type: ImageType;
  duration: number; // millisecond
}

export interface Button {
  text: string;
  containerStyle: StyleProp<ViewStyle>;
  textString: StyleProp<TextStyle>;
}
