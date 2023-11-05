import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.reducer'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
import storage from "redux-persist/lib/storage";
import {  persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import subjectReducer from './subject/subject.reducer';
import studentReducer from './student/student.reducer';
import teachReducer from './teach/teach.reducer';
import feeReducer from './fee/fee.reducer';
import { getPersistConfig } from 'redux-deep-persist';

const rootReducer = combineReducers({
  auth: authReducer,
  student : studentReducer,
  subject : subjectReducer,
  teach : teachReducer,
  fee: feeReducer

})

const persistConfig = getPersistConfig({
  key: "root",
  storage,
  whitelist: ['auth.userInfo'],
  rootReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),

})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>() 
