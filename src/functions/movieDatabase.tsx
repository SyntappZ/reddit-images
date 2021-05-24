import { ChildData, Child } from "../interfaces/HttpDataInterfaces";
import { RedditImageArray, ImageObject } from "../interfaces/MainInterfaces";

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

const fetchGifSubreddits = async (): Promise<string[]> => {
  const url = "https://www.reddit.com/r/multihub/wiki/gifs.json";

  // try {
  //   const response = await fetch(url);
  //   const { data } = await response.json();
  //   const str = data.content_md;
  //   const removeAdultContent = str.slice(0, str.indexOf("#NSFW"));
  //   const subreddits = removeAdultContent.match(/\/r\/\w+/g);
  //   return subreddits;
  // } catch (err) {
  //   console.error(err);
  //   return [];
  // }
  return [];
};
const fetchImageSubreddits = async () => {
  const url =
    "https://www.reddit.com/r/redditlists/comments/128ayc/list_of_funny_subreddits.json";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const str = data[0].data.children[0].data.selftext;

    // const sections = str.split('\\n\\nComics:')
    const subreddits = str.match(/\/r\/\w+/g);
    console.log(subreddits);
  } catch (err) {
    console.error(err);
    return null;
  }
};
export { fetchImageData, fetchGifSubreddits, fetchImageSubreddits };
