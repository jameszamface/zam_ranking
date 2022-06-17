export interface TutorialContextProps {
  completeActionWithId: (id: string | number) => void;
  completeActionWithStep: (step: number) => void;
}
