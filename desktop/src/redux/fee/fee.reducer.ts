import { nanoid, createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
import { IFeeState, IPayloadActionFee } from '../../interface/fee'
import { getAllFee, getFee } from './fee.thunk'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const initialState: IFeeState = {
  fees : [],
  loading: false,
  currentRequestId: undefined
}

const feeSlice = createSlice({
  name: 'fee',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getFee.fulfilled, (state, action: PayloadAction<IPayloadActionFee>) => {
      state.fees = action.payload.data
    })
    .addCase( getAllFee.fulfilled, (state, action: PayloadAction<IPayloadActionFee>) => {
      state.fees = action.payload.data
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

// export const {  } = feeSlice.actions
const feeReducer = feeSlice.reducer

export default feeReducer
