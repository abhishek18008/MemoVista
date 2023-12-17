import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api/index.js'

export const jwtsignin=createAsyncThunk(
    'auth/sigindata',
    async(formdata)=>{
        const res=await api.jwtsignin(formdata);
        console.log(res.data);
        return res;
    }
)

export const jwtsignup=createAsyncThunk(
    'auth/signupdata',
    async(formdata)=>{
        try {
            const res=await api.jwtsignup(formdata);
            console.log(res.data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)

export const authSlice=createSlice({
    name:'auth',
    initialState:{

    },
    reducers:{
        login:(state,action)=>{
            localStorage.setItem('profile',JSON.stringify(action.payload));
            state.authData=action.payload;
        },
        _logout:(state,action)=>{
            localStorage.clear();
            state.authData=null;
        },
        
    },
    extraReducers:(builder)=>{
        builder.addCase(jwtsignin.fulfilled,(state,action)=>{
            localStorage.setItem('profile',JSON.stringify(action.payload.data));
            state.authData=action.payload.data.result;
        })
        builder.addCase(jwtsignup.fulfilled,(state,action)=>{
            console.log(action.payload.data);
        })
    }
})

export const {login,_logout} = authSlice.actions;
export default authSlice.reducer;