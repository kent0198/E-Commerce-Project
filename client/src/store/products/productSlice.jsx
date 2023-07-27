import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as actions from './asynsAction'

export const productSlice=createSlice({
    name:'product',
    initialState:{
        newProducts:null,
        errorMessage:'',
    },
    reducers:{
        
    },
    //code logic xu li async action 
    extraReducers:(builder)=>{
        builder.addCase(actions.getNewProducts.pending, (state)=>{
            state.isLoading=true;
        })
        //thuc hien action get Api
        builder.addCase(actions.getNewProducts.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.newProducts=action.payload;
        });
        //Khi thuc hien that bai 
        builder.addCase(actions.getNewProducts.rejected, (state, action)=>{
            state.isLoading=false;
            if (action.payload) {
                state.errorMessage = action.payload.message;
              } else {
                state.errorMessage = "An error occurred.";
              }
        })
    }
})

export const {}=productSlice.actions

export default productSlice.reducer