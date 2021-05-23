import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchImageData } from "../functions/movieDatabase";
import { ImageObject } from "../interfaces/MainInterfaces";
import { RedditImagesState } from "../interfaces/ReduxInterfaces";

export const fetchImages = createAsyncThunk(
  "reddit/fetchImages",
  async (subreddit: string, { getState }) => {
    const { currentSubreddit, after } = getState() as RedditImagesState;

    if (currentSubreddit && currentSubreddit === subreddit) {
      const response = await fetchImageData(subreddit, after);
      return { isNewSubreddit: false, data: response };
    } else {
      const response = await fetchImageData(subreddit, "");
      return { isNewSubreddit: true, data: response };
    }
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
    currentSubredditId: "",
    fetchingImages: false
  } as RedditImagesState,
  reducers: {
    clearImages(state, action) {
      state.images = [];
      state.gifs = [];
      state.after = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      const { images, after, errorMessage, subredditId, subreddit } =
        action.payload.data;
      const { isNewSubreddit } = action.payload;

      const hasImages = images.length > 0;

      const clearImages = () => {
        state.images = [];
        state.gifs = [];
        state.after = "";
      };

      if (isNewSubreddit) {
        clearImages();
      }

      state.currentSubreddit = subreddit;
      state.currentSubredditId = subredditId;
      if (errorMessage) {
        state.currentSubreddit = errorMessage;
        clearImages()
      }

      state.after = after;
      if (hasImages) {
        images.forEach((image: ImageObject) => {
          const imageReg = /\.jpg$|\.png$/;
          const url = image.url;
          const preview = image.thumbnail;

          if (imageReg.test(url)) {
            state.images.push(image);
          }
          if (image.url.endsWith(".gif")) {
            state.gifs.push(image);
          }
        });
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearImages } = redditImagesSlice.actions;

export default redditImagesSlice.reducer;
