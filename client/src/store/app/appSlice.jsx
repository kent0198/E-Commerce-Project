import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as actions from './asyncActions'

export const appSlice=createSlice({
    name:'app',
    initialState:{
        categories:null,
        isLoading :false,
    },
    reducers:{
      /*   logout:(state)=>{
            state.isLoading=false
        } */
    },
    //code logic xu li async action 
    extraReducers:(builder)=>{
        builder.addCase(actions.getCategories.pending, (state)=>{
            state.isLoading=true;
        })
        //thuc hien action get Api
        builder.addCase(actions.getCategories.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.categories=action.payload;
        });
        //Khi thuc hien that bai 
        builder.addCase(actions.getCategories.rejected, (state, action)=>{
            state.isLoading=false;
            if (action.payload) {
                state.errorMessage = action.payload.message;
              } else {
                state.errorMessage = "An error occurred.";
              }
        })
    }
})

export const {}=appSlice.actions

export default appSlice.reducer