import React, { useState, useEffect } from "react";
import ImageGrid from "../components/ImageGrid";
import "../css/imagesPage.css";

import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";
import { fetchImages } from "../redux/redditImagesSlice";

const ImagesPage = () => {
  const { images, currentSubreddit } = useAppSelector(
    (state) => state.redditImages
  );
  console.log("current " + currentSubreddit);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadMoreImages = () => {


    if (!isLoaded) {
      console.log("load more images");
      console.log(currentSubreddit);
       dispatch(fetchImages(currentSubreddit));
      setTimeout(() => {
        setIsLoaded(false);
      }, 3000);
    }
  };

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log("bottom reached");

      // loadMoreImages();
      // setIsLoaded(true);
    }
  };

  return (
    <div className="images-page">
      <ImageGrid images={images} currentSubreddit={currentSubreddit} />
    </div>
  );
};

export default ImagesPage;
