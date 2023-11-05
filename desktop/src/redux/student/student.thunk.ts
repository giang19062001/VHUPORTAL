import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../utils/http"
import { IPayloadActionDefault, IPayloadActionStudent, IPayloadActionTeacher, IStudentPost } from "../../interface/student"
import { API } from "../../utils/api"

const createFormData = (body: IStudentPost) => {
  const formdata = new FormData()
  formdata.append('name', body.name)
  formdata.append('gender', body.gender)
  formdata.append('major', body.major)
  formdata.append('birthday', body.birthday)
  formdata.append('avatar', body.avatar)
  return formdata
}
export const createStudent = createAsyncThunk(API.createStudent, async (body:IStudentPost, thunkApi) => {
  try {
    const formdata = createFormData(body)
    const response = await http.post<IPayloadActionDefault>(API.createStudent, formdata, {
      signal: thunkApi.signal
    })
    return response.data
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data)
  }
})

export const getAllStudent = createAsyncThunk(API.getAllStudent, async (_, thunkApi) => {
  const response = await http.post<IPayloadActionStudent>(API.getAllStudent, {
    signal: thunkApi.signal 
  })
  return response.data
})


export const getAllTeacher = createAsyncThunk(API.getAllTeacher, async (_, thunkApi) => {
  const response = await http.post<IPayloadActionTeacher>(API.getAllTeacher, {
    signal: thunkApi.signal 
  })
  return response.data
})

export const getDetailStudent = createAsyncThunk(API.getDetailStudent, async (id : number, thunkApi) => {
  const response = await http.post(API.getDetailStudent+`/${id}`, {
    signal: thunkApi.signal 
  })
  return response.data
})

