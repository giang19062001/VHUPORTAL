import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthLogin, IPayloadActionAuth } from '../../interface/auth'
import http from '../../utils/http'
import { API } from '../../utils/api'

export const login = createAsyncThunk(API.login, async (body: IAuthLogin , thunkApi) => {
  try {

    const response = await http.post<IPayloadActionAuth>(API.login, body, {
      signal: thunkApi.signal
    })
    return response.data
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data)
  }
})
