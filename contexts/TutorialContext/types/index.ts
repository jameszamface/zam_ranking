export interface TutorialContextProps {
  screen: string;
  step: number;
  completeActionWithId: (id: string | number) => void;
  completeActionWithStep: (step: number) => void;
}
