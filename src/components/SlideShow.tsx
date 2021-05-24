import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Carousel,
} from "react-bootstrap";
import "../css/slideShow.css";
import { ImageObject } from "../interfaces/MainInterfaces";
interface slideShowProps {
  images: ImageObject[];
  gifs: ImageObject[];
}

interface SlideStyleTypes {
  position: string;
  left?: number;
  top?: number;
  zIndex?: number;
}

const SlideShow = ({ images, gifs }: slideShowProps) => {
  const [isGifs, setIsGifs] = useState(false);
  const [imageList, setImageList] = useState<ImageObject[]>([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [slideCount, setSlideCound] = useState(0);

  const fetchMoreImages = () => {
      console.log('fetch more')
  };

  useEffect(() => {
    console.log(slideCount + "/" + gifs.length);
  }, [gifs.length, slideCount]);

  useEffect(() => {
    if (images.length > 0) {
      setImageList(images);
      setIsGifs(false);
    } else if (gifs.length > 0) {
      setImageList(gifs);
      setIsGifs(true);
    }
  }, [images.length, gifs.length]);

  const toggleImages = () => {
    if (isGifs) {
      setImageList(images);
    } else {
      setImageList(gifs);
    }
  };

  const full = {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 3000,
  } as SlideStyleTypes;
  const min = {
    position: "relative",
  } as SlideStyleTypes;

  const handleSelect = (selectedIndex: number) => {
  
  };

  const slideStyle = fullScreen ? full : min;
  return (
    <div className="slide-show" style={{ position: "relative" }}>
      <div className="slide-show-bar">
        <Container fluid className="p-3">
          <Row>
            <Col></Col>
            <Col className="d-flex flex-row-reverse">
              <Button
                variant="outline-light"
                className="mr-2"
                onClick={() => setFullScreen(!fullScreen)}
              >
                fullscreen
              </Button>
              {gifs.length > 0 ? (
                <Button
                  variant="outline-light"
                  className="mr-2"
                  onClick={toggleImages}
                >
                  {isGifs ? "images" : "gifs"}
                </Button>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
      <Carousel interval={3000} onSelect={handleSelect}>
        {imageList.map((image) => (
          <Carousel.Item className="slide-item">
            <div className="slide-image-wrap">
              <img src={image.url} alt={image.title} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SlideShow;
