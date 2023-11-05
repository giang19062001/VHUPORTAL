import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../utils/http'
import { IPayloadActionMajor, IPayloadActionSubject } from '../../interface/subject'
import { API } from '../../utils/api'

export const getAllSubject = createAsyncThunk(API.getAllSubject, async (_, thunkApi) => {
    const response = await http.post<IPayloadActionSubject>(API.getAllSubject, {
      signal: thunkApi.signal 
    })
    return response.data
  })
  

export const getAllMajor = createAsyncThunk(API.getAllMajor, async (_, thunkApi) => {
    const response = await http.post<IPayloadActionMajor>(API.getAllMajor, {
      signal: thunkApi.signal 
    })
    return response.data
  })
  