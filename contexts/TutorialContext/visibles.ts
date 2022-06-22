import {ActionInfo} from '.';
import {Area} from './types/common';

// Covers는 튜토리얼 컴포넌트의 상하좌우를 감싸서 해당 컴포넌트 이외 영역 터치를 차단하는 컴포넌트입니다.
// 액션이 없거나 모달의 버튼이 있으면 보여주지 않습니다.
// 모달의 버튼이 있는 경우, 모달 버튼만 누를 수 있도록 하기 위해 FullCover를 보여줍니다.
export const isCoversVisible = (actionInfo?: ActionInfo) => {
  return !actionInfo?.visible || !actionInfo?.action.modal?.button;
};

// FullCover는 모달을 제외한 전체 영역 터치를 차단하는 컴포넌트입니다.
// 모달의 버튼이 있고 확인이 눌려지지 않은 경우(튜토리얼이 보여지는 경우)만 보여집니다.
export const isFullCoverVisible = (actionInfo?: ActionInfo) => {
  return actionInfo?.action.modal?.button && actionInfo.visible;
};

export const isModalVisible = (actionInfo?: ActionInfo) => {
  return actionInfo?.visible && actionInfo?.action.modal;
};

// TutorialTrigger 컴포넌트를 가리키기 위한 이미지가 보여질지 결정합니다.
// 이미지나 TutorialTrigger 컴포넌트 영역(area) 정보가 없으면 보여주지 않습니다.
// 모달의 버튼이 없으면 모달과 함께 보여줍니다.
// 모달의 버튼이 있으면 모달의 확인 버튼이 눌려지지 않은 경우((튜토리얼이 보여지는 경우))만 보여줍니다.
export const isImageVisible = (actionInfo?: ActionInfo, area?: Area) => {
  if (!actionInfo?.action.image || !area) return false;

  if (
    !actionInfo?.action.modal?.button ||
    (!actionInfo?.visible && actionInfo?.action.modal?.button)
  ) {
    return true;
  }

  return false;
};
