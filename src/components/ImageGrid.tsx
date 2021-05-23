import React from "react";
import Masonry from "react-masonry-css";
import { ImageObject } from "../interfaces/MainInterfaces";
import "../css/imageGrid.css";
interface ImageGridProps {
  images: ImageObject[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  var items = [
    { id: 1, name: "My First Item" },
    { id: 2, name: "Another item" },
    { id: 3, name: "Third Item" },
    { id: 4, name: "Here is the Fourth" },
    { id: 5, name: "High Five" },
    { id: 1, name: "My First Item" },
    { id: 2, name: "Another item" },
    { id: 3, name: "Third Item" },
    { id: 4, name: "Here is the Fourth" },
    { id: 5, name: "High Five" },
    { id: 1, name: "My First Item" },
    { id: 2, name: "Another item" },
    { id: 3, name: "Third Item" },
    { id: 4, name: "Here is the Fourth" },
    { id: 5, name: "High Five" },
  ];

  // Convert array to JSX items
  const jeff = items.map((item, i) => {
    return (
      <div
        style={{
          width: "100%",
          height: `${i * 40}px`,
          backgroundColor: "red",
          margin: "10px 0",
        }}
        key={item.id}
      >
        {item.name}
      </div>
    );
  });

  return (
    <div className="image-grid">
      <Masonry
        breakpointCols={{ default: 4, 800: 2 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image: ImageObject, i) => {
          return (
            <div key={image.id} className="image-wrap">
              <img src={image.url} />
            </div>
          );
        })}
      </Masonry>
    </div>
  );
}

const Images = ({ images }: ImageGridProps) => {
  return (
    <>
      {images.map((image: ImageObject, i) => {
        return (
          <div
            key={image.id}
            className="image-wrap"
            style={{
              width: "100%",
              height: `${i * 40}px`,
              backgroundColor: "red",
              margin: "10px 0",
            }}
          >
            {/* <img src={image.url} /> */}
          </div>
        );
      })}
    </>
  );
};
