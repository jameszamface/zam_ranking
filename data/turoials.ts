import {Action, ActionType} from '../contexts/TutorialContext/types/Action';
import {Tutorial} from '../contexts/TutorialContext/types/Tutorial';

const actionAA: Action = {
  id: 0,
  type: ActionType.Auto,
  modal: {
    size: {
      width: 0.9,
      height: 0,
    },
    position: {
      top: 0.1,
    },
    text: '안녕하세요1',
  },
};

const actionAB: Action = {
  id: 0,
  type: ActionType.Auto,
  modal: {
    size: {
      width: 0.9,
      height: 0,
    },
    position: {
      bottom: 0.1,
    },
    text: '안녕하세요2',
  },
};

const tutorialA: Tutorial = {
  id: 0,
  screen: 'MyZam',
  actions: [actionAA, actionAB],
  description: '마이잼 튜토리얼입니다.',
};

export const tutorials = [tutorialA];
