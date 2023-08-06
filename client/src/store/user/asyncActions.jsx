import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis/user'

export const getCurrent= createAsyncThunk('user/current',async(data,{rejectWithValue})=>{
    const response=await apis.apiGetCurrent()
    if(!response.success) return rejectWithValue(response)
    return response.rs
})