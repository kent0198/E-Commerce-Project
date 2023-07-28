import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const userSlice=createSlice({
    name:'user',
    initialState:{
        isLoggedIn:null,
        current:null,
        token:null
    },
    reducers:{
        register:(state, action)=>{
            state.isLoggedIn=action.payload.isLoggedIn
            state.current=action.payload.userData
            state.token=action.payload.token
        }
    },
   /*  //code logic xu li async action 
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
    } */
})

export const {register}=userSlice.actions

export default userSlice.reducer