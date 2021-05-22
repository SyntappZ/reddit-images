import { createSlice } from "@reduxjs/toolkit";
import { subreddits } from "../data/subreddits";
export const subredditDataSlice = createSlice({
  name: "subredditDataSlice",
  initialState: {
    photography: subreddits.photography,
    funny: subreddits.funny,
    gifs: [],
    favorites: []
  },
  reducers: {
    addGifData: (state, action) => {},
   
  },
});

// Action creators are generated for each case reducer function
export const { addGifData } = subredditDataSlice.actions;

export default subredditDataSlice.reducer;
