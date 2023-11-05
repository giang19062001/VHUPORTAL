import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../utils/api'
import http from '../../utils/http';

export const getTeachOfTeacher = createAsyncThunk(API.getTeachOfTeacher, async (id , thunkApi) => {
  try {

    const response = await http.post(`${API.getTeachOfTeacher}/${id}`, {
      signal: thunkApi.signal
    })

    return response.data
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return thunkApi.rejectWithValue(error.response.data)
  }
})

export const getSignTeachOfTeacherAndSubject = createAsyncThunk(API.getSignTeachOfTeacherAndSubject, async (body , thunkApi) => {
  try {

    const response = await http.post(API.getSignTeachOfTeacherAndSubject, body ,{
      signal: thunkApi.signal
    })

    return response.data
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return thunkApi.rejectWithValue(error.response.data)
  }
})

