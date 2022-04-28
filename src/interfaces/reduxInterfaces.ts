
import { ImageObject } from './MainInterfaces'





export interface NavbarDataState {
  photography: string[];
  memes: string[];
  gifs: string[];
  favorites: string[];
  recent: string[];
}

export interface RedditImagesState {
  after: string;
  afterArray: string[];
  images: ImageObject[];
  gifs: ImageObject[];
  allImages: ImageObject[];
  imagePages: Array<ImageObject[]>;
  favorites: ImageObject[];
  history: string[];
  currentSubreddit: string;
  currentSubredditId: string;
  fetchingImages: boolean;
  searching: boolean;
}

