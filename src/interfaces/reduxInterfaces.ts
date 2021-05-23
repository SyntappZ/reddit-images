
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
  images: ImageObject[];
  gifs: ImageObject[];
  favorites: ImageObject[];
  currentSubreddit: string;
  currentSubredditId: string;
  fetchingImages: boolean;
}

