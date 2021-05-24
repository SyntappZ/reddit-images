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
  subredditId: string;
  imagePages: Array<ImageObject[]>
}

interface SlideStyleTypes {
  position: string;
  left?: number;
  top?: number;
  zIndex?: number;
}

const SlideShow = ({ images, subredditId, imagePages }: slideShowProps) => {
  
  
  const [fullScreen, setFullScreen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideSpeed, setSlideSpeed] = useState(4000);
  const fetchMoreImages = () => {
    console.log("fetch more");
  };



  useEffect(() => {
    setSlideIndex(0)
  }, [subredditId])

  const handleSelect = (selectedIndex: number) => {
    setSlideIndex(selectedIndex)
  };

 
  return (
    <div className="slide-show" style={{ position: "relative" }}>
      <div className="slide-show-bar">
        <Container fluid className="p-3">
          <Row>
            <Col>
            <p style={{color: 'white'}}>Pages: {imagePages.length} </p>
            </Col>
            <Col className="d-flex flex-row-reverse">
              <Button
                variant="outline-light"
                className="mr-2"
                onClick={() => setFullScreen(!fullScreen)}
              >
                fullscreen
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Carousel activeIndex={slideIndex} interval={slideSpeed} onSelect={handleSelect}>
        {images.map((image) => (
          <Carousel.Item key={image.id} className="slide-item">
            <div className="slide-image-wrap">
              <img  src={image.url} alt={image.title} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SlideShow;
