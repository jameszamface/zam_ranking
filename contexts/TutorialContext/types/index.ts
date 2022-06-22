import {ActionInfo} from '..';
import {Area} from './common';

export interface TutorialContextProps {
  actionInfo?: ActionInfo;
  scrollLockRecommended: boolean;
  screen: string;
  completeActionWithId: (id: string | number) => void;
  completeActionWithStep: (step: number) => void;
  setArea: (area: Area) => void;
  hideAction: () => void;
}
