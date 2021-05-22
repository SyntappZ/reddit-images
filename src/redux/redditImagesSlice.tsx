import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    currentSubreddit: "",
  } as RedditImagesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      const { images, after } = action.payload;

      
     
      const nextSubreddit = `/r/${images[0].subreddit}`
      if(state.currentSubreddit === nextSubreddit) {
        state.after = after;
      }else{
        state.after = ""
      }
      state.currentSubreddit = nextSubreddit;
      images.forEach((image: ImageObject) => {
        const imageReg = /\.jpg$|\.png$/;
        const url = image.url;
        const preview = image.thumbnail
        if (url.endsWith(".gif")) {
          state.gifs.push(image);
        }
        if (imageReg.test(url)) {
          state.images.push(image);
        }
      });
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = redditImagesSlice.actions;

export default redditImagesSlice.reducer;
