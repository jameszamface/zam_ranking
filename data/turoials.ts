import {Action, ActionType} from '../contexts/TutorialContext/types/Action';
import {Tutorial} from '../contexts/TutorialContext/types/Tutorial';

const actionAA: Action = {
  id: 0,
  type: ActionType.Auto,
};

const tutorialA: Tutorial = {
  id: 0,
  screen: 'MyZam',
  actions: [actionAA],
  description: '마이잼 튜토리얼입니다.',
};

export const tutorials = [tutorialA];
