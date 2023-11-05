import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../utils/http'
import { API } from '../../utils/api'
import { IPayPost, IPayloadActionFee } from '../../interface/fee'

  export const pay = createAsyncThunk(API.pay, async (body:IPayPost, thunkApi) => {
    try {
      const response = await http.post(API.pay, body, {
        signal: thunkApi.signal
      })
      return response.data
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  })

  export const getFee = createAsyncThunk(API.getFee, async (id : string, thunkApi) => {
    const response = await http.post<IPayloadActionFee>(API.getFee+`/${id}`, {
      signal: thunkApi.signal 
    })
    return response.data
  })

  
  export const getAllFee = createAsyncThunk(API.getAllFee, async (_, thunkApi) => {
    const response = await http.post<IPayloadActionFee>(API.getAllFee, {
      signal: thunkApi.signal 
    })
    return response.data
  })

  