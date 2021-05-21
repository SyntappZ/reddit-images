import { createSlice, configureStore, } from '@reduxjs/toolkit'
import subredditData from './subredditData'

const store = configureStore({
    reducer: subredditData   
})

export default store