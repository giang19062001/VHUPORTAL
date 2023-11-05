import { createSlice } from '@reduxjs/toolkit';
import { getSignTeachOfTeacherAndSubject, getTeachOfTeacher } from './teach.thunk';

const initialState = {
  teachs: null,
  students:null,
  loading: false,
  currentRequestId: undefined
};

export const teachSlice = createSlice({
  name: 'teach',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(getTeachOfTeacher.fulfilled, (state, action) => {
        state.teachs = action.payload.data

      })
      .addCase(getSignTeachOfTeacherAndSubject.fulfilled, (state, action) => {
        state.students = action.payload.data

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


export const selectTeach = state => state.teach.teachs;
export const selectStudent = state => state.teach.students;
export const selectTeachLoading = state => state.teach.loading;

export default teachSlice.reducer;

