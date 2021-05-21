import { ChildData, Child } from "../interfaces/HttpDataInterfaces";
import { RedditImageArray, ImageObject } from "../interfaces/MainInterfaces";

class RedditImages {
  after: string;
  images: ImageObject[];

  constructor(after: string, images: ImageObject[]) {
    this.after = after;
    this.images = images;
  }
}

const fetchImageData = async (
  subreddit: string
): Promise<RedditImageArray | null> => {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  try {
    const response = await fetch(url);
    const { data } = await response.json();
    const after = data.after;
    const images = data.children.map((item: Child) => {
      return {
        title: item.data.title,
        thumbnail: item.data.thumbnail,
        url: item.data.url,
        permalink: item.data.permalink,
        subreddit: item.data.subreddit,
      };
    });
    const imagesData = new RedditImages(after, images);
    return imagesData;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const fetchGifSubreddits = async (): Promise<string[] | null> => {
  const url = "https://www.reddit.com/r/multihub/wiki/gifs.json";

  try {
    const response = await fetch(url);
    const { data } = await response.json();
    const str = data.content_md;
    const removeAdultContent = str.slice(0, str.indexOf("#NSFW"));
    const subreddits = removeAdultContent.match(/\/r\/\w+/g);
    return subreddits;
  } catch (err) {
    console.error(err);
    return null;
  }
};
const fetchImageSubreddits = async () => {
  const url = "https://www.reddit.com/r/redditlists/comments/128ayc/list_of_funny_subreddits.json"

  try {
    const response = await fetch(url);
    const data = await response.json();

    const str = data[0].data.children[0].data.selftext
    
    // const sections = str.split('\\n\\nComics:')
     const subreddits = str.match(/\/r\/\w+/g);
     console.log(subreddits)
    
  } catch (err) {
    console.error(err);
    return null;
  }
};
export { fetchImageData, fetchGifSubreddits, fetchImageSubreddits };