import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";
import { getUserImages } from "../redux/currentImageSlice";
import LazyImage from "../components/LazyImage";
import ImageGrid from "../components/ImageGrid";
import "../css/currentImagePage.css";
const CurrentImagePage = () => {
  const history = useHistory();

  const { currentImageObject, userImages } = useAppSelector(
    (state) => state.currentImage
  );

  const dispatch = useAppDispatch();

  const goBackToImagesPage = () => {
    history.push('/') 
  }

  useEffect(() => {
    dispatch(getUserImages(""));
  }, []);

  return (
    <div className="image-page">
      <Container fluid>
        <Button onClick={goBackToImagesPage} variant="outline-info">
          back
        </Button>
        <div className="current-image-wrap">
          <img src={currentImageObject.url} />
        </div>
        <h1>More images from user {currentImageObject.author}</h1>

        <div className="user-images">
          <ImageGrid images={userImages} />
        
        </div>
      </Container>
    </div>
  );
};

export default CurrentImagePage;
