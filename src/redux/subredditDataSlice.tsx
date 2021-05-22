import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subreddits } from "../data/subreddits";
import { fetchGifSubreddits } from "../functions/movieDatabase";
import { SubredditDataState } from "../interfaces/reduxInterfaces";

export const fetchSubreddits = createAsyncThunk<string[]>(
  "subreddits/fetchSubreddits",
  async () => {
    const response = await fetchGifSubreddits();
    return response;
  }
);
export const subredditDataSlice = createSlice({
  name: "subredditData",
  initialState: {
    photography: subreddits.photography,
    funny: subreddits.funny,
    gifs: [],
    favorites: [],
  } as SubredditDataState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubreddits.fulfilled, (state, action) => {
      state.gifs = action.payload
    });
  },
});







// Action creators are generated for each case reducer function
export const { } = subredditDataSlice.actions;

export default subredditDataSlice.reducer;
