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
import { fetchImages, addToAfterArray } from "../redux/redditImagesSlice";
import { useAppDispatch } from "../redux/reduxHooks";

interface slideShowProps {
  images: ImageObject[];
  subredditId: string;
  imagePages: Array<ImageObject[]>;
  after: string;
  afterArray: string[];
  subreddit: string;
}

interface SlideStyleTypes {
  position: string;
  top: number;
  left: number;
  zIndex: number;
  height: string;
  paddingTop: string;
};

const SlideShow = ({
  images,
  subredditId,
  subreddit,
  imagePages,
  after,
  afterArray,
}: slideShowProps) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [page, setPage] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideSpeed, setSlideSpeed] = useState(2000);
  const [pageImages, setPageImages] = useState<ImageObject[]>([]);
  const dispatch = useAppDispatch();

  const fetchNextPage = () => {
    if (!afterArray.includes(after)) {
      console.log("fetch more");
      dispatch(fetchImages(subreddit));
      dispatch(addToAfterArray(after));
    } else {
      const next = page + 1;
      const item = imagePages[next];
      setPageImages(item);
      setPage(next);
    }
  };
 

  useEffect(() => {
    setSlideIndex(0);
  }, [subredditId]);



  const handleSelect = (selectedIndex: number) => {
    setSlideIndex(selectedIndex);
  };

  const changePage = (forward: boolean) => {
    if (forward) {
      fetchNextPage();
    } else {
      if (page) {
        setPage((state) => state - 1);
      }
    }
  };

  const slideStyle = {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    zIndex: 40000,
    height: "100vh",
    paddingTop: "5vh",
  } 

  return (
    <div
      className="slide-show"
      style={fullScreen ? slideStyle : { position: "relative" }}
    >
      <div className="slide-show-bar">
        <Container fluid className="p-3">
          <Row>
            <Col>
              <p style={{ color: "white" }}>Pages: {imagePages.length} </p>
              <Button
                variant="outline-light"
                className="mr-2"
                onClick={() => changePage(false)}
              >
                previous page
              </Button>
            </Col>
            <Col className="d-flex flex-row-reverse">
              <Button
                variant="outline-light"
                className="mr-2"
                onClick={() => setFullScreen(!fullScreen)}
              >
                {fullScreen ? "shrink" : "expand"}
              </Button>
              <Button
                variant="outline-light"
                className="mr-2"
                onClick={() => changePage(true)}
              >
                next page
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Carousel
        activeIndex={slideIndex}
        interval={slideSpeed}
        onSelect={handleSelect}
      >
        {images.map((image, i) => (
          <Carousel.Item key={image.id + i} className="slide-item">
            <div
              className="slide-image-wrap"
              style={
                fullScreen
                  ? undefined
                  : { backgroundColor: "rgba(0, 0, 0, 0.075)" }
              }
            >
              <img
                src={image.url}
                alt={image.title}
                style={fullScreen ? { height: "90vh" } : undefined}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SlideShow;
