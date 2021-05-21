import { createSlice } from "@reduxjs/toolkit";
import { subreddits } from "../data/subreddits";
export const subredditData = createSlice({
  name: "subredditData",
  initialState: {
    photography: subreddits.photography,
    funny: subreddits.funny,
    gifs: [],
  },
  reducers: {
    addGifData: (state, action) => {},
   
  },
});

// Action creators are generated for each case reducer function
export const { addGifData } = subredditData.actions;

export default subredditData.reducer;
