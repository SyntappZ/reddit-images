import { createSlice, configureStore, } from '@reduxjs/toolkit'
import subredditDataSlice from './subredditDataSlice'

const store = configureStore({
    reducer: {
        subredditData: subredditDataSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store