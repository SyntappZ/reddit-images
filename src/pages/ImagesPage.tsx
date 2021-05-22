import React, { useState } from "react";

import "../css/imagesPage.css";

import { useAppSelector } from "../redux/reduxHooks";
const ImagesPage = () => {
  const { images } = useAppSelector((state) => state.redditImages);
  return (
    <div className="images-page">
      <div className="image-flex">
        {images.map((image) => {
          return (
            <div key={image.url} className="image-wrap">
              <img src={image.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImagesPage;
