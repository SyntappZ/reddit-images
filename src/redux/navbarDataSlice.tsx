import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subreddits } from "../data/subreddits";

import { removeDuplicates } from "../functions/converterFunctions";
import { NavbarDataState } from "../interfaces/ReduxInterfaces";




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
   
  },
});

// Action creators are generated for each case reducer function
export const {} = navbarDataSlice.actions;

export default navbarDataSlice.reducer;
