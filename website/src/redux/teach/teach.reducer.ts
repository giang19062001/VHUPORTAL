import {
  nanoid,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunk,
} from "@reduxjs/toolkit";
import {
  closeSemeter,
  deteleSignTeach,
  getAllSemeter,
  getSignTeach,
  getTeachSemeter,
  openSemeter,
  signTeach,
} from "./tech.thunk";
import {
  IPayloadActionSemeter,
  IPayloadActionSignTeach,
  IPayloadActionTeach,
  ITeachState,
} from "../../interface/teach";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

const initialState: ITeachState = {
  semeters: [],
  teachs: [],
  signs: [],
  loading: false,
  currentRequestId: undefined,
};

const teachSlice = createSlice({
  name: "teach",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getAllSemeter.fulfilled,
        (state, action: PayloadAction<IPayloadActionSemeter>) => {
          state.semeters = action.payload.data;
        }
      )
      .addCase(
        getTeachSemeter.fulfilled,
        (state, action: PayloadAction<IPayloadActionTeach>) => {
          state.teachs = action.payload.data;
        }
      )
      .addCase(
        getSignTeach.fulfilled,
        (state, action: PayloadAction<IPayloadActionSignTeach>) => {
          state.signs = action.payload.data;
        }
      )
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) =>
          action.type.endsWith("/rejected") ||
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (
            state.loading &&
            state.currentRequestId === action.meta.requestId
          ) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      )
      .addDefaultCase((state, action) => {});
  },
});

// export const {  } = teachSlice.actions
const teachReducer = teachSlice.reducer;

export default teachReducer;
