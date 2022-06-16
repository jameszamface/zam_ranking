import React, {createContext, PropsWithChildren} from 'react';
import {TutorialContextProps} from './types';

const TutorialContext = createContext<TutorialContextProps | null>(null);

function TutorialProvider({children}: PropsWithChildren<{}>) {
  return (
    <TutorialContext.Provider value={{}}>{children}</TutorialContext.Provider>
  );
}

export default TutorialProvider;
