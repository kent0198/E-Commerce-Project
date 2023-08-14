import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as actions from './asyncActions'

export const userSlice=createSlice({
    name:'user',
    initialState:{
        isLoggedIn:false,
        current:null,
        token:null,
        isLoading:false,
        mes:''
    },
    reducers:{
        login:(state, action)=>{
            state.isLoggedIn=action.payload.isLoggedIn
            state.token=action.payload.token
        },
        logout:(state, action)=>{
            state.isLoggedIn=false
            state.token=null
            state.current=null
            state.mes=''
        },
        clearMessage:(state)=>{
            state.mes='' 
        }
    },
    //code logic xu li async action 
    extraReducers:(builder)=>{
        builder.addCase(actions.getCurrent.pending, (state)=>{
            state.isLoading=true;
        })
        //thuc hien action get Api
        builder.addCase(actions.getCurrent.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.current=action.payload;
            state.isLoggedIn=true;
        });
        //Khi thuc hien that bai 
        builder.addCase(actions.getCurrent.rejected, (state, action)=>{
            state.isLoading=false;
            state.current=null;
            state.isLoggedIn=false;
            state.token=null;
            state.mes='Login version has expired';
        })
    }
})

export const {login,logout,clearMessage}=userSlice.actions

export default userSlice.reducer