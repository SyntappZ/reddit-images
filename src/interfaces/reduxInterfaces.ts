
import { ImageObject } from './MainInterfaces'

export interface NavbarDataState {
  photography: string[];
  funny: string[];
  gifs: string[];
  favorites: string[];
  recent: string[];
}

export interface RedditImagesState {
  after: string;
  images: ImageObject[];
  gifs: ImageObject[];
  currentSubreddit: string;
}

export interface SearchObject {
  subreddit: string,
  after: string
}