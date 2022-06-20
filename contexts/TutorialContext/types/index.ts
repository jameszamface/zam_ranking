import {Area} from './common';

export interface TutorialContextProps {
  step?: number | undefined;
  scrollLockRecommended: boolean;
  visibility: boolean;
  screen: string;
  completeActionWithId: (id: string | number) => void;
  completeActionWithStep: (step: number) => void;
  setAccessibleArea: (area: Area) => void;
  hideAction: () => void;
}
