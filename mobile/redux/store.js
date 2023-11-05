import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.reducer';
import teachReducer from './teach/teach.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teach: teachReducer,
  },
});