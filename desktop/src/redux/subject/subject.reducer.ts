import { nanoid, createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
import { getAllMajor, getAllSubject } from './subject.thunk'
import { IPayloadActionMajor, IPayloadActionSubject, ISubjectState } from '../../interface/subject'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const initialState: ISubjectState = {
  subjects: [],
  majors : [],
  loading: false,
  currentRequestId: undefined
}

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllSubject.fulfilled, (state, action: PayloadAction<IPayloadActionSubject>) => {
        state.subjects = action.payload.data
      })
      .addCase(getAllMajor.fulfilled, (state, action: PayloadAction<IPayloadActionMajor>) => {
        state.majors = action.payload.data
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
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
})

// export const {  } = authSlice.actions
const subjectReducer = subjectSlice.reducer

export default subjectReducer
