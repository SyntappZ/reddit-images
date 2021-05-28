import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserImages } from "../functions/movieDatabase";
import { RedditImagesState } from "../interfaces/ReduxInterfaces";
import { storeItem, fetchFromStorage } from "../functions/storageFunctions";
import {
  RedditImageArray,
  UserImageArray,
  ImageObject,
  UserImageObject,
} from "../interfaces/MainInterfaces";

interface CurrentImageState {
  after: string;
  currentImageObject: ImageObject;
  userImages: UserImageObject[];
}

interface CurrentImageProps {
  currentImage: CurrentImageState;
}
export const getUserImages = createAsyncThunk(
  "user/images",
  async (user: string, { getState }) => {
    const { currentImage } = getState() as CurrentImageProps;
    const { author } = currentImage.currentImageObject;

    const data = await fetchUserImages(author);

    return data;
  }
);
export const currentImageSlice = createSlice({
  name: "currentImage",
  initialState: {
    after: "",
    currentImageObject: {},
    userImages: [],
  } as unknown as CurrentImageState,
  reducers: {
    addImageToStore(state, action) {
      state.currentImageObject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserImages.fulfilled, (state, action) => {
      state.userImages = []
      state.after = action.payload.after;
      const { images } = action.payload;
      const hasImages = images.length > 0;

      if (hasImages) {
        images.forEach((image: UserImageObject) => {
          const imageReg = /\.jpg$|\.png$|\.gif$/;
          const { url } = image;

          if (url && imageReg.test(url)) {
            state.userImages.push(image);
          }
        });
      }
    });
  },
});


export const { addImageToStore } = currentImageSlice.actions;

export default currentImageSlice.reducer;
