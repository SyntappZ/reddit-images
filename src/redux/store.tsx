import { createSlice, configureStore, } from '@reduxjs/toolkit'
import subredditDataSlice from './navbarDataSlice'
import redditImagesSlice from './redditImagesSlice'

const store = configureStore({
    reducer: {
        subredditData: subredditDataSlice,
        redditImages: redditImagesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store