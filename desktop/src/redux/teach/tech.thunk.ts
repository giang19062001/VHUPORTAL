import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../utils/http'
import { API } from '../../utils/api'
import { IPayloadActionSemeter, IPayloadActionSignTeach, IPayloadActionTeach, ISignTeachPost } from '../../interface/teach'

export const getAllSemeter = createAsyncThunk(API.getSemeter, async (_, thunkApi) => {
    const response = await http.post<IPayloadActionSemeter>(API.getSemeter, {
      signal: thunkApi.signal 
    })
    return response.data
  })
  

export const getTeachSemeter = createAsyncThunk(API.getTeachSemeter, async (id : number, thunkApi) => {
    const response = await http.post<IPayloadActionTeach>(API.getTeachSemeter+`/${id}`, {
      signal: thunkApi.signal 
    })
    return response.data
  })
  export const getSignTeach = createAsyncThunk(API.getSignTeach, async (id : string, thunkApi) => {
    const response = await http.post<IPayloadActionSignTeach>(API.getSignTeach+`/${id}`, {
      signal: thunkApi.signal 
    })
    return response.data
  })
  export const deteleSignTeach = createAsyncThunk(API.deteleSignTeach, async (id : number, thunkApi) => {
    const response = await http.post(API.deteleSignTeach+`/${id}`, {
      signal: thunkApi.signal 
    })
    return response.data
  })

  export const openSemeter = createAsyncThunk(API.openSemeter, async (id : number, thunkApi) => {
    const response = await http.post(API.openSemeter+`/${id}`, {
      signal: thunkApi.signal 
    })
    return response.data
  })

  
  export const closeSemeter = createAsyncThunk(API.closeSemeter, async (id : number, thunkApi) => {
    const response = await http.post(API.closeSemeter+`/${id}`, {
      signal: thunkApi.signal 
    })
    return response.data
  })
  

  export const signTeach = createAsyncThunk(API.signTeach, async (body:ISignTeachPost, thunkApi) => {
    try {
      const response = await http.post(API.signTeach, body, {
        signal: thunkApi.signal
      })
      return response.data
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  })
  