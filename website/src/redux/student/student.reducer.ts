import {
  nanoid,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunk,
} from "@reduxjs/toolkit";
import {
  IPayloadActionStudent,
  IPayloadActionTeacher,
  IStudentState,
} from "../../interface/student";
import {
  createStudent,
  getAllStudent,
  getAllTeacher,
  getDetailStudent,
} from "./student.thunk";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

const initialState: IStudentState = {
  students: [],
  teachers: [],
  loading: false,
  currentRequestId: undefined,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getAllStudent.fulfilled,
        (state, action: PayloadAction<IPayloadActionStudent>) => {
          state.students = action.payload.data;
        }
      )
      .addCase(
        getAllTeacher.fulfilled,
        (state, action: PayloadAction<IPayloadActionTeacher>) => {
          state.teachers = action.payload.data;
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
            //TRÁNH ABORT LẠI
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      )
      .addDefaultCase((state, action) => {});
  },
});

// export const {  } = studentSlice.actions
const studentReducer = studentSlice.reducer;

export default studentReducer;
