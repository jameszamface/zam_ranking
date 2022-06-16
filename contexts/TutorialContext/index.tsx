import React, {createContext, PropsWithChildren} from 'react';
import {TutorialContextProps} from './types';

const TutorialContext = createContext<TutorialContextProps | null>(null);

// SafeAreaProvider, QueryClientProvider, NavigationContainer 안에 위치해야 합니다.
function TutorialProvider({children}: PropsWithChildren<{}>) {
  return (
    <TutorialContext.Provider value={{}}>{children}</TutorialContext.Provider>
  );
}

export default TutorialProvider;
