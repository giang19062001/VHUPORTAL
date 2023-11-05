import { createSlice } from '@reduxjs/toolkit';
import { login } from './auth.thunk';

const initialState = {
  userInfo: null,
  loading: false,
  currentRequestId: undefined
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  
    logout: state => {
      state.userInfo =null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload.data

      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addDefaultCase((state, action) => {})
  }
});

export const {logout } = authSlice.actions;

export const selectUserInfo = state => state.auth.userInfo;
export const selectAuthLoading = state => state.auth.loading;

export default authSlice.reducer;

