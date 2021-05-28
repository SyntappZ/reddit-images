import React, { useState, useEffect } from "react";
import ImageGrid from "../components/ImageGrid";
import "../css/imagesPage.css";

import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";
import { fetchImages } from "../redux/redditImagesSlice";

const ImagesPage = () => {
  const { images, currentSubreddit, history } = useAppSelector(
    (state) => state.redditImages
  );

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sendItem = (item: string) => {
    dispatch(fetchImages(item));
  };

  const loadMoreImages = () => {
    if (!isLoaded) {
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
      <div className="recent-list">
        {history.map((item, i) => {
          if (i < 10) {
            return (
              <p onClick={() => sendItem(item)} key={item + i}>
                r/{item}
              </p>
            );
          }
        })}
      </div>
      <ImageGrid images={images} />
    </div>
  );
};

export default ImagesPage;
