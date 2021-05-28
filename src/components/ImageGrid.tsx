import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { ImageObject, UserImageObject } from "../interfaces/MainInterfaces";
import "../css/imageGrid.css";
import { ImageGridProps } from "../interfaces/MainInterfaces";
import LazyImage from "./LazyImage";

const ImageGrid = ({ images }: ImageGridProps) => {
  // const [countImages, setCountImages] = useState<number>(0);

  // useEffect(() => {
  //   console.log(countImages);
  // }, [countImages]);

  return (
    <div className="image-grid">
      <Masonry
        breakpointCols={{ default: 4, 800: 2, 500: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image: ImageObject | UserImageObject) => {
          return (
            <LazyImage
              key={image.id}
              image={image}   
            />
          );
        })}
      </Masonry>
    </div>
  );
};

export default ImageGrid;
