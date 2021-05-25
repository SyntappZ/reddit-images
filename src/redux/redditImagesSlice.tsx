import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchImageData } from "../functions/movieDatabase";
import { ImageObject } from "../interfaces/MainInterfaces";
import { RedditImagesState } from "../interfaces/ReduxInterfaces";
import { storeItem, fetchFromStorage } from "../functions/storageFunctions";
interface redditImagesProps {
  redditImages: RedditImagesState;
}

export const fetchImages = createAsyncThunk(
  "reddit/fetchImages",
  async (subreddit: string, { getState }) => {
    const { redditImages } = getState() as redditImagesProps;
    const currentSubreddit = redditImages.currentSubreddit.toLowerCase();
    const nextSubreddit = subreddit.toLowerCase();
    const { after } = redditImages;
    const isSameSubreddit = currentSubreddit === nextSubreddit;

    if (isSameSubreddit) {
      console.log("not new");

      const response = await fetchImageData(subreddit, after);
      return { isNewSubreddit: false, data: response };
    } else {
      console.log("is new");

      const response = await fetchImageData(subreddit, "");
      return { isNewSubreddit: true, data: response };
    }
  }
);
export const redditImagesSlice = createSlice({
  name: "redditImages",
  initialState: {
    after: "",
    afterArray: [],
    images: [],
    gifs: [],
    allImages: [],
    imagePages: [],
    pageCounter: [],
    favorites: [],
    history: [],
    currentSubreddit: "",
    currentSubredditId: "",
    fetchingImages: false,
  } as RedditImagesState,
  reducers: {
    addHistoryItems(state) {
      const data = fetchFromStorage("history");

      if (data) {
        state.history = data;
      }
    },
    addToAfterArray(state, action) {
      state.afterArray.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      const { images, after, errorMessage, subredditId, subreddit } =
        action.payload.data;
      const { isNewSubreddit } = action.payload;

      const hasImages = images.length > 0;
      
      const addHistory = () => {
        if (state.history.includes(subreddit)) return;

        if (state.history.length <= 50) {
          state.history.unshift(subreddit);
        } else {
          state.history.pop();
          state.history.unshift(subreddit);
        }
        storeItem("history", state.history);
      };

      const clearImages = () => {
        state.images = [];
        state.gifs = [];
        state.allImages = [];
        state.after = "";
        state.imagePages = [];
        state.afterArray = [];
      };

      if (isNewSubreddit) {
        addHistory();
        clearImages();
      }

      state.currentSubreddit = subreddit;
      state.currentSubredditId = subredditId;
      if (errorMessage) {
        state.currentSubreddit = errorMessage;
        clearImages();
      }

      const imageArray: ImageObject[] = [];

      state.after = after;
      if (hasImages) {
        images.forEach((image: ImageObject) => {
          const imageReg = /\.jpg$|\.png$/;
          const url = image.url;
          const preview = image.thumbnail;

          if (imageReg.test(url)) {
            state.images.push(image);
            imageArray.push(image);
          }
          if (image.url.endsWith(".gif")) {
            state.gifs.push(image);
            imageArray.push(image);
          }
        });

        state.allImages = [...state.allImages, ...imageArray];
        state.imagePages.push(imageArray);
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { addHistoryItems, addToAfterArray } = redditImagesSlice.actions;

export default redditImagesSlice.reducer;
