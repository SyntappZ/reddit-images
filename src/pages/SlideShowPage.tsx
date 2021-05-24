import React from "react";
import SlideShow from "../components/SlideShow";
import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";

const SlideShowPage = () => {
  const { allImages, currentSubredditId, imagePages } = useAppSelector((state) => state.redditImages);

  // console.log(allImages)
  return (
    <div className="slide-show-page">
      <SlideShow images={allImages} subredditId={currentSubredditId} imagePages={imagePages} />
    </div>
  );
};

export default SlideShowPage;
