import { nanoid, createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
import { login } from './auth.thunk'
import { IAuthState, IPayloadActionAuth } from '../../interface/auth'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const initialState: IAuthState = {
  userInfo: null,
  loading: false,
  currentRequestId: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<IPayloadActionAuth>) => {
        state.userInfo = action.payload.data
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
            //TRÁNH ABORT LẠI 
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addDefaultCase((state, action) => {})
  }
})

export const {logout  } = authSlice.actions
const authReducer = authSlice.reducer

export default authReducer
