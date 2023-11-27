import { configureStore } from '@reduxjs/toolkit';
import {songIdSlice} from './songIdSlice';

export const store = configureStore({
  reducer: {
    songId: songIdSlice.reducer,
  },
});