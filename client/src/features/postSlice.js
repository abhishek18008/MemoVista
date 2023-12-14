import { createSlice } from '@reduxjs/toolkit';

import * as api from '../api/index.js';

export const postSlice=createSlice({
    name:'post',
    initialState:{
        posts:[]
    },
    reducers:{
        fetchPosts:(state)=>{
            try {
                const {data}=api.fetchPosts();
                state.posts=data;
            } catch (error) {
                console.log(error.message);
            }
        }
    }
})


export const {fetchPosts} =postSlice.actions;
export default postSlice.reducer;