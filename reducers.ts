import { createSlice } from '@reduxjs/toolkit';
import { UserInfo, ExamInfo, GlobalState } from './types/types'; // Import your type definitions

const initialState: GlobalState = {
  userInfo: {
    name: '',
    dateOfBirth: '',
    canRead: false,
    canWrite: false,
    profession: null,
  },
  examInfo: {
    orientation: {
      yearQuestion: 0,
      hourQuestion: 0,
      monthDayQuestion: 0,
      weekDayQuestion: 0,
      monthQuestion: 0,
      countryQuestion: 0,
      regionQuestion: 0,
      cityQuestion: 0,
      whereWeAreQuestion: 0,
      floorQuestion: 0
    },
    fixation: {
      repeatWordsQuestion: 0
    },
    calcAttention: {
      minusSequenceQuestion: 0,
      spellingQuestion: 0
    },
    memory: {
      rememberWordsQuestion: 0
    },
    lenguage: {
      objectIdentificationQuestion: 0,
      repeatSentence: 0,
      sayInstructionsQuestion: 0,
      readInstructionQuestion: 0,
      writeSenteceQuestion: 0,
      drawQuestion: 0
    },
    applicationDate: '',
    itAutoEvaluation: true,
  },
  totalProgress: 0,
  examSection: 'Preguntas demográficas'
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState: initialState.userInfo,
  reducers: {
    setName(state, action) { //
      state.name = action.payload;
    },
    setDateOfBirth(state, action){ //
      state.dateOfBirth = action.payload;
    },
    setCanRead(state, action){ //
      state.canRead = action.payload;
    },
    setCanWrite(state, action){ //
      state.canWrite = action.payload;
    },
    setProfession(state, action){ //
      state.profession = action.payload;
    }
  },
});

const examSlice = createSlice({
  name: 'examInfo',
  initialState: initialState.examInfo,
  reducers: {
    // Orientation
    setOrientationYearQuestion(state, action) { //
      state.orientation.yearQuestion = action.payload;
    },
    setOrientationHourQuestion(state, action) { //
      state.orientation.hourQuestion = action.payload;
    },
    setOrientationMonthDayQuestion(state, action) { //
      state.orientation.monthDayQuestion = action.payload;
    },
    setOrientationWeekDayQuestion(state, action) { //
      state.orientation.weekDayQuestion = action.payload;
    },
    setOrientationMonthQuestion(state, action) { //
      state.orientation.monthQuestion = action.payload;
    },
    setOrientationCountryQuestion(state, action) { //
      state.orientation.countryQuestion = action.payload;
    },
    setOrientationRegionQuestion(state, action) { //
      state.orientation.regionQuestion = action.payload;
    },
    setOrientationCityQuestion(state, action) { //
      state.orientation.cityQuestion = action.payload;
    },
    setOrientationWhereWeAreQuestion(state, action) { //
      state.orientation.whereWeAreQuestion = action.payload;
    },
    setOrientationFloorQuestion(state, action) { /* Falta adaptación */
      state.orientation.floorQuestion = action.payload;
    },
    
    // Fixation
    setFixationRepeatWordsQuestion(state, action) { // 
      state.fixation.repeatWordsQuestion = action.payload;
    },
    
    // CalcAttention
    setCalcAttentionMinusSequenceQuestion(state, action) { //
      state.calcAttention.minusSequenceQuestion = action.payload;
    },
    setCalcAttentionSpellingQuestion(state, action) { //
      state.calcAttention.spellingQuestion = action.payload;
    },
    
    // Memory
    setMemoryRememberWordsQuestion(state, action) { // 
      state.memory.rememberWordsQuestion = action.payload;
    },
    
    // Language
    setLanguageObjectIdentificationQuestion(state, action) { //
      state.lenguage.objectIdentificationQuestion = action.payload;
    },
    setLanguageRepeatSentence(state, action) { // 
      state.lenguage.repeatSentence = action.payload;
    },
    setLanguageSayInstructionsQuestion(state, action) { /* Falta AI implementación*/
      state.lenguage.sayInstructionsQuestion = action.payload;
    },
    setLanguageReadInstructionQuestion(state, action) { /* Falta AI implementación */
      state.lenguage.readInstructionQuestion = action.payload;
    },
    setLanguageWriteSentenceQuestion(state, action) { /* Falta AI implementación */
      state.lenguage.writeSenteceQuestion = action.payload;
    },
    setLanguageDrawQuestion(state, action) { /* Falta adaptación */
      state.lenguage.drawQuestion = action.payload;
    },
    
    // General
    setApplicationDate(state, action) {
      state.applicationDate = action.payload;
    },
    setAutoEvaluation(state, action) {
      state.itAutoEvaluation = action.payload;
    },
  },
});

// Usage:
//dispatch(examSlice.actions.setExamInfoProperty({ property: 'orientation.yearQuestion', value: 2023 }));

const progressSlice = createSlice({
  name: 'totalProgress',
  initialState: initialState.totalProgress,
  reducers: {
    setTotalProgress(state, action) {
      return action.payload
    }
  },
});

const examSectionSlice = createSlice({
    name: 'examSection',
  initialState: initialState.examSection,
  reducers: {
    setExamSection(state, action) {
      return action.payload
    }
  },
})



export const progressActions = progressSlice;
export const userReducer = userSlice.reducer;
export const examReducer = examSlice.reducer;
export const progressReducer = progressSlice.reducer;
export const examSectionReducer = examSectionSlice.reducer;
