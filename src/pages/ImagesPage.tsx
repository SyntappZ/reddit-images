import React, { useState } from "react";
import ImageGrid from "../components/ImageGrid";
import "../css/imagesPage.css";
import { useAppSelector } from "../redux/reduxHooks";



const ImagesPage = () => {
  const { images } = useAppSelector((state) => state.redditImages);
 
 
  return (
    <div className="images-page">
      <ImageGrid images={images} />
    </div>
  );
};

export default ImagesPage;
