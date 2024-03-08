import React, { createContext, useContext, useState } from 'react';

// Type for the information of the user
type UserInfo = {
  name: string;
  dateOfBirth: Date;
  canRead: boolean;
  canWrite: boolean;
  profession: string | null;
};

// Type for the information of the exam
type ExamInfo = {
  applicationDate: Date;
  selfEvaluation: string;
  pregunta1: string;
  pregunta2: string;
};

// Type for the global state
type GlobalState = {
  userInfo: UserInfo;
  examInfo: ExamInfo;
  totalProgress: number;
};

// Create the global state context within the provider
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

type GlobalStateContextType = {
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
};

// GlobalStateProvider component
export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GlobalState>({
    userInfo: { name: '', dateOfBirth: new Date(), canRead: false, canWrite: false },
    examInfo: { selfEvaluation: '', pregunta1: '', pregunta2: '' },
    totalProgress: 0,
  });

  // Provides the global state through the context
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Hook for accessing global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState debe ser utilizado dentro de un GlobalStateProvider');
  }
  return context;
};
