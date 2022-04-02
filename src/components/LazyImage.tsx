import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageObject, UserImageObject } from "../interfaces/MainInterfaces";
import { useHistory } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Lottie from "react-lottie";
import animationData from "../images/loadingImage.json";
import { useAppDispatch } from "../redux/reduxHooks";
import { addImageToStore } from "../redux/currentImageSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
interface LazyImageProps {
  image: ImageObject | UserImageObject;
}

const LazyImage = ({ image }: LazyImageProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const goToImagePage = () => {
    dispatch(addImageToStore(image));
    history.push(`/image/${image.id}`)
  };

  const load = () => {
    setLoading(false);
  };

 

  return (
    <div className="image-wrap" onClick={goToImagePage}>
     
      {/* <FaHeart className="fav-heart" color="black" size="1.5rem" /> */}
      
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
