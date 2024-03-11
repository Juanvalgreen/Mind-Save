import { configureStore } from '@reduxjs/toolkit';
import { userReducer, examReducer, progressReducer } from './reducers'; // Import reducers

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    examInfo: examReducer,
    totalProgress: progressReducer,
  },
});

export default store;