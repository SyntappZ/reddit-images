import { ChildData, Child } from "../interfaces/HttpDataInterfaces";
import { UserData } from "../interfaces/UserDataInterfaces";
import {
  RedditImageArray,
  ImageObject,
  UserImageObject,
} from "../interfaces/MainInterfaces";

const fetchImageData = async (
  subreddit: string,
  after: string
): Promise<RedditImageArray> => {
  try {
    if (!subreddit) throw "empty";

    const url: string = `https://www.reddit.com/r/${subreddit}.json?limit=100&after=${after}`;
    const response = await fetch(url);
    const { data } = await response.json();

    const afterString = data.after;
    const images = data.children.map((item: Child): ImageObject => {
      return {
        author: item.data.author,
        title: item.data.title,
        thumbnail: item.data.thumbnail,
        url: item.data.url,
        permalink: item.data.permalink,
        subreddit: item.data.subreddit,
        subredditId: item.data.subreddit_id,
        id: item.data.id,
      };
    });

    if (images.length > 0) {
      const imagesData: RedditImageArray = {
        after: afterString,
        images: images,
        subredditId: images[0].subredditId,
        subreddit: images[0].subreddit,
        errorMessage: "",
      };
      return imagesData;
    } else {
      return {
        after: "",
        images: [],
        subredditId: "",
        subreddit: "",
        errorMessage: "No images found.",
      };
    }
  } catch (err) {
    console.log(err);
    const message =
      err === "empty" ? "Search is empty." : "Not a valid Subreddit.";

    return {
      after: "",
      images: [],
      subredditId: "",
      subreddit: "",
      errorMessage: message,
    };
  }
};

const fetchUserImages = async (user: string) => {
  const url = `https://www.reddit.com/user/${user}.json`;

  try {
    const response = await fetch(url);

    const { data } = await response.json();

    console.log(data.children);

    const afterString = data.after;
    const images = data.children.map((item: UserData): UserImageObject => {
      const link = item.data.url || item.data.link_url;
      return {
        author: item.data.author,
        title: item.data.title,
        url: link,
        permalink: item.data.permalink,
        subreddit: item.data.subreddit,
        subredditId: item.data.subreddit_id,
        id: item.data.id,
      };
    });

    if (images.length > 0) {
      const imagesData: RedditImageArray = {
        after: afterString,
        images: images,
        subredditId: images[0].subredditId,
        subreddit: images[0].subreddit,
        errorMessage: "",
      };
      return imagesData;
    } else {
      return {
        after: "",
        images: [],
        subredditId: "",
        subreddit: "",
        errorMessage: "No images found.",
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export { fetchImageData, fetchUserImages };
