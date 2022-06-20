import {ActionInfo} from '..';
import {Area} from './common';

export interface TutorialContextProps {
  actionInfo?: ActionInfo;
  screen: string;
  completeActionWithId: (id: string | number) => void;
  completeActionWithStep: (step: number) => void;
  setAccessibleArea: (area: Area) => void;
  hideAction: () => void;
}
