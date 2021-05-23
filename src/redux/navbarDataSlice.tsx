import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subreddits } from "../data/subreddits";
import { fetchGifSubreddits } from "../functions/movieDatabase";
import { removeDuplicates } from "../functions/converterFunctions";
import { NavbarDataState } from "../interfaces/ReduxInterfaces";



export const fetchSubreddits = createAsyncThunk<string[]>(
  "subreddits/fetchSubreddits",
  async () => {
    const response = await fetchGifSubreddits();
    return response;
  }
);
export const navbarDataSlice = createSlice({
  name: "navbarData",
  initialState: {
    photography: subreddits.photography,
    memes: subreddits.memes,
    gifs: [],
    favorites: [],
    recent: [],
  } as NavbarDataState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubreddits.fulfilled, (state, action) => {
      state.gifs = removeDuplicates(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = navbarDataSlice.actions;

export default navbarDataSlice.reducer;
