import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { error } from "node:console";
import { subreddits } from "../data/subreddits";
import { fetchImageData } from "../functions/movieDatabase";
import { RedditImageArray, ImageObject } from "../interfaces/MainInterfaces";
import { RedditImagesState, SearchObject } from "../interfaces/ReduxInterfaces";

export const fetchImages = createAsyncThunk(
  "reddit/fetchImages",
  async ({ subreddit, after }: SearchObject) => {
    const response = await fetchImageData(subreddit, after);
    return response;
  }
);
export const redditImagesSlice = createSlice({
  name: "redditImages",
  initialState: {
    after: "",
    images: [],
    gifs: [],
    favorites: [],
    currentSubreddit: "",
  } as RedditImagesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      const { images, after, errorMessage } = action.payload;
      const hasImages = images.length > 0;
      
      console.log(images)
      console.log('after: ' + after)
      if (errorMessage) {
        state.currentSubreddit = errorMessage;
        state.after = "";
        state.images = [];
        state.gifs = [];
      }

      if (hasImages) {
        const nextSubreddit = `/r/${images[0].subreddit}`;
        if (state.currentSubreddit === nextSubreddit) {
          state.after = after;
        } else {
          state.after = "";
          state.images = [];
          state.gifs = [];
        }
        state.currentSubreddit = nextSubreddit;
        images.forEach((image: ImageObject) => {
          const imageReg = /\.jpg$|\.png$|\.gif$/;
          const url = image.url;
          const preview = image.thumbnail;
        
          if (imageReg.test(url)) {
            state.images.push(image);
          }
        });
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = redditImagesSlice.actions;

export default redditImagesSlice.reducer;
