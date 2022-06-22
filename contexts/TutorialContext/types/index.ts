import {ActionInfo} from '..';
import {AreaInfo} from '../hooks/useCovers';

export interface TutorialContextProps {
  actionInfo?: ActionInfo;
  screen: string;
  completeActionWithId: (id: string | number) => void;
  completeActionWithStep: (step: number) => void;
  setAreaInfo: (area: AreaInfo) => void;
  hideAction: () => void;
}
