export interface TutorialContextProps {}

export enum State {
  Pending = 0, // 트리거 전
  Complete,
}

// width와 height는 비율(0~1) 또는 절대값(1~number)을 값으로 가질 수 있습니다.
export interface Size {
  width: number;
  height: number;
}

// 각 position 요소는 비율(0~1) 또는 절대값(1~number)을 값으로 가질 수 있습니다.
// top과 bottom이 동시에 입력되면 top이 우선합니다.
// left와 right가 동시에 입력되면 right가 우선합니다.
// top과 bottom 또는 left와 right가 모두 입력되지 않으면 상하/좌우 가운데 정렬됩니다.
// 엘리먼트의 좌상단이 position에 위치하게 됩니다.
export interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export type Text =
  | string
  | (
      | string
      | {
          color: string;
          text: string;
        }
    )[];

