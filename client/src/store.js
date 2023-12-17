import { configureStore } from '@reduxjs/toolkit'
import postReducer from './features/postSlice.js'
import authReducer from './features/authSlice.js'

const store = configureStore({ 
    reducer: {
        post:postReducer,
        auth:authReducer
    }
 })

export default store;