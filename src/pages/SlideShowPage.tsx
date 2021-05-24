import React from "react";
import SlideShow from "../components/SlideShow";
import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";

const SlideShowPage = () => {
  const { images, gifs } = useAppSelector((state) => state.redditImages);
  return (
    <div className="slide-show-page">
      <SlideShow images={images} gifs={gifs} />
    </div>
  );
};

export default SlideShowPage;
