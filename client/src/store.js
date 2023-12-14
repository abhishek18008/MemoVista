import { configureStore } from '@reduxjs/toolkit'
import postReducer from './features/postSlice.js'

const store = configureStore({ 
    reducer: {
        postReducer:postReducer
    }
 })

export default store;