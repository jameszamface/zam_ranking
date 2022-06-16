import React, {createContext, PropsWithChildren, useContext} from 'react';
import {TutorialContextProps} from './types';

const TutorialContext = createContext<Partial<TutorialContextProps>>({});

// SafeAreaProvider, QueryClientProvider, NavigationContainer 안에 위치해야 합니다.
function TutorialProvider({children}: PropsWithChildren<{}>) {
  const getTutorial = (screen: string) => {
    
  };

  const triggerAction = () => {};

  const completeAction = () => {};

  return (
    <TutorialContext.Provider
      value={{
        getTutorial,
        triggerAction,
        completeAction,
      }}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  return useContext(TutorialContext) as TutorialContextProps;
}

export default TutorialProvider;
