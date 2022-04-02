import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchImageData } from "../functions/movieDatabase";
import { ImageObject } from "../interfaces/MainInterfaces";
import { RedditImagesState } from "../interfaces/ReduxInterfaces";
import { storeItem, fetchFromStorage } from "../functions/storageFunctions";
import currentImageSlice from "./currentImageSlice";
import { is } from "immer/dist/internal";
interface redditImagesProps {
  redditImages: RedditImagesState;
}

export const fetchImages = createAsyncThunk(
  "reddit/fetchImages",
  async (subreddit:string) => {
  console.log(subreddit)
      const response = await fetchImageData(subreddit, "");
     
      return response;
    
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
    },
    addSubreddit(state, action) {
        state.currentSubreddit = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      const { images, after, errorMessage, subredditId, subreddit } =
        action.payload;
     

      const hasImages = images.length > 0;
      
  

      const clearImages = () => {
        state.images = [];
        state.gifs = [];
        state.allImages = [];
        state.after = "";
        state.imagePages = [];
        state.afterArray = [];
      };

    

      state.currentSubreddit = subreddit;
      state.currentSubredditId = subredditId;
      if (errorMessage) {
        state.currentSubreddit = errorMessage;
        clearImages();
      }

      const imageArray: ImageObject[] = [];
      const justImages: ImageObject[] = [];
      const gifs: ImageObject[] = [];
      state.after = after;
      if (hasImages) {
        images.forEach((image: ImageObject) => {
          const imageReg = /\.jpg$|\.png$/;
          const url = image.url;
          const preview = image.thumbnail;

          if (imageReg.test(url)) {
            
            
            imageArray.push(image);
            justImages.push(image);
          }
          if (image.url.endsWith(".gif")) {
            
            imageArray.push(image);
            gifs.push(image);
          }
        });

      
      }
      state.images = [];
      state.images.push(...justImages);
      
      state.gifs.push(...gifs);
      
        state.allImages.push(...imageArray);
    
       
      
    });
  },
});

// Action creators are generated for each case reducer function
export const { addHistoryItems, addToAfterArray, addSubreddit } = redditImagesSlice.actions;

export default redditImagesSlice.reducer;
