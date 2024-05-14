import { configureStore } from '@reduxjs/toolkit';
import { userReducer, examReducer, progressReducer, examSectionReducer } from './reducers'; // Import reducers

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    examInfo: examReducer,
    totalProgress: progressReducer,
    examSection: examSectionReducer
  },
});

export default store;