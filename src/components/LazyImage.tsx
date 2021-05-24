import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageObject } from "../interfaces/MainInterfaces";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Lottie from "react-lottie";
import animationData from "../images/loadingImage.json";
interface LazyImageProps {
  image: ImageObject;
}

const LazyImage = ({ image }: LazyImageProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const load = () => {
    setLoading(false);
  };

  return (
    <div className="image-wrap">
      <LazyLoadImage
        alt={image.title}
        effect="opacity"
        src={image.url}
        width={"100%"}
        afterLoad={load}
      />
      {loading ? <LottieLoader /> : null}
    </div>
  );
};

const LottieLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="lottie-wrap">
      <Lottie options={defaultOptions} width={100} />
    </div>
  );
};

export default LazyImage;
