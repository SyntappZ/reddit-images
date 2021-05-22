import React, { useState } from "react";

import "../css/imagesPage.css";

import { useAppSelector } from "../redux/reduxHooks";
const GifsPage = () => {
  const { gifs } = useAppSelector((state) => state.redditImages);
  console.log(gifs)
  return (
    <div className="images-page">
      <div className="image-flex">
        {gifs.map((image) => {
          return (
            <div  key={image.url} className="image-wrap">
              <img src={image.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GifsPage