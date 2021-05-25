import React from "react";
import SlideShow from "../components/SlideShow";
import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";

const SlideShowPage = () => {
  const {
    allImages,
    currentSubredditId,
    imagePages,
    after,
    afterArray,
    currentSubreddit,
  } = useAppSelector((state) => state.redditImages);

  // console.log(allImages)
  return (
    <div className="slide-show-page">
      <SlideShow
        images={allImages}
        subredditId={currentSubredditId}
        imagePages={imagePages}
        subreddit={currentSubreddit}
        after={after}
        afterArray={afterArray}
      />
    </div>
  );
};

export default SlideShowPage;
