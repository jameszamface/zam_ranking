import {Action, ActionCallback} from './Action';
import {Tutorial} from './Tutorial';

export interface TutorialContextProps {
  getTutorial: (screen: string) => Promise<Tutorial[]>;
  triggerAction: (action: Action, callback: ActionCallback) => Promise<void>;
  completeTutorial: (id: number) => void;
  completeAction: (tutorialId: number, actionId: number) => Promise<void>;
}
