import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../utils/api'
import http from '../../utils/http';

export const login = createAsyncThunk(API.login, async (body , thunkApi) => {
  try {

    const response = await http.post(API.login, body, {
      signal: thunkApi.signal
    })

    return response.data
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return thunkApi.rejectWithValue(error.response.data)
  }
})
