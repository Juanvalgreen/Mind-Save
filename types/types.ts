// Tipo para la información del usuario
export type UserInfo = {
    name: string,
    dateOfBirth: string,
    canRead: boolean,
    canWrite: boolean,
    profession: string | null
};
  
// Tipo para la información del examen
export type ExamInfo = {
    orientation: {
        yearQuestion: 1 | 0,
        hourQuestion: 1 | 0,
        monthDayQuestion: 1 | 0,
        weekDayQuestion: 1 | 0,
        monthQuestion: 1 | 0,
        countryQuestion: 1 | 0,
        regionQuestion: 1 | 0,
        cityQuestion: 1 | 0,
        whereWeAreQuestion: 1 | 0,
        floorQuestion: 1 | 0
    },
    fixation: {
        repeatWordsQuestion: number
    },
    calcAttention: {
        mathSequenceQuestion: number,
        spellingQuestion: number
    },
    memory: {
        rememberWordsQuestion: number
    },
    lenguage: {
        objectIdentificationQuestion: number,
        repeatSentence: number,
        sayInstructionsQuestion: number,
        readInstructionQuestion: number,
        writeSenteceQuestion: number,
        drawQuestion: number
    }

    applicationDate: string,
    itAutoEvaluation: boolean,
};
  
// Tipo para el estado global
export type GlobalState = {
    userInfo: UserInfo,
    examInfo: ExamInfo,
    totalProgress: number
    examSection: string
    analysis: AnalysisState
};

// Define el tipo del contexto
export type GlobalStateContextType = {
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
};

export type PatientInfo = {
  name: string;
  age: number;
}

export type ExamResults = {
  orientation: {
    score: number;
    analysis: string;
  };
  fixation: {
    score: number;
    analysis: string;
  };
  calcAttention: {
    score: number;
    analysis: string;
  };
  memory: {
    score: number;
    analysis: string;
  };
  language: {
    score: number;
    analysis: string;
  };
}

export type TotalScore = {
  score: number;
  analysis: string;
}

export type AnalysisState = {
  patientInfo: PatientInfo;
  examResults: ExamResults;
  totalScore: TotalScore;
  recommendations: string[];
}



export type optionsSelect= { 
    label: string;
    value: number
}