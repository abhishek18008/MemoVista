import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import * as api from '../api/index.js'

export const addPost=createAsyncThunk(
    'post/addPost',
    async(postData)=>{
      const res=await api.createPost(postData);
      return res;
    }
)

export const likePost=createAsyncThunk(
  'post/likePost',
  async(id)=>{
    return await api.likePost(id);
  }
)

export const postSlice = createSlice({
    name: 'post',
    initialState: {
      posts: [],
    },
    reducers: {
      loadposts:(state,action)=>{
        state.posts=action.payload;
      },
      updatePost:(state,action)=>{
        for (var p of state.posts) {
          if (p._id === action.payload.currId) {
            const updatedPost = { ...p, ...action.payload.postData };
            state.posts = state.posts.map((post) =>
              post._id === p._id ? updatedPost : post
            );
          }
        }
      },
      deletePost:(state,action)=>{
        const updatedPost=state.posts.filter((post)=>post._id !=action.payload)
        state.posts=updatedPost;
      }
    },
    extraReducers:(builder)=>{
      builder.addCase(addPost.fulfilled,(state,action)=>{
        // state.posts.push(res.data);
        console.log(action);
        state.posts.push(action.payload.data);
      })
      builder.addCase(likePost.fulfilled,(state,action)=>{
        state.posts=state.posts.map((post)=>post._id===action.meta.arg?action.payload.data:post);
      })
    }
  });
  
export const {loadposts,updatePost,deletePost} =postSlice.actions;
export default postSlice.reducer;