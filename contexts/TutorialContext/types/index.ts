import {Action, ActionCallback} from './Action';
import {Tutorial} from './Tutorial';

export interface TutorialContextProps {
  getTutorial: (screen: string) => Tutorial[];
  triggerAction: (action: Action, callback: ActionCallback) => void;
  completeAction: (id: number) => void;
}
