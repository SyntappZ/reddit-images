import React, {  useState, useEffect } from "react";
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
  const [slideSpeed, setSlideSpeed] = useState(3000);
  const [buttonText, setButtonText] = useState("Gifs");
  const [isGifs, setIsGifs] = useState(false);
  const [pageImages, setPageImages] = useState<ImageObject[]>([]);
  const [allImages, setAllImages] = useState<ImageObject[]>([]);
  const dispatch = useAppDispatch();

  const gifToggle = () => {
    if(isGifs) {
      setSlideIndex(0)
      setAllImages(shuffle(images));
      setIsGifs(false);
      
    }else{
      const gifs = gifExtractor(images);
      setSlideIndex(0)
      setAllImages(shuffle(gifs));
      setIsGifs(true);
      
    }
  };

  const gifExtractor = (arr: ImageObject[]) => {
    const gifs:ImageObject[] = []

    arr.forEach(image => {
      if (image.url.endsWith(".gif")) {
            
        gifs.push(image);
        
      }
    })
    return gifs
  }

  useEffect(() => {
    if(isGifs) {
      setSlideSpeed(6000)
      setButtonText("IMAGES")
    }else{
      setSlideSpeed(3000)
      setButtonText("GIFS")


    }
  }, [isGifs])

  function shuffle(array: ImageObject[]) {
    const arr = [...array]

    let currentIndex = arr.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
  
    return arr;
  }

  
  useEffect(() => {

   
    if(images.length > 0) {
      setSlideIndex(0)
      setAllImages(shuffle(images))
      
    }
  }, [images]);

  useEffect(() => {
    setSlideIndex(0);
  }, [subredditId]);



  const handleSelect = (selectedIndex: number) => {
    setSlideIndex(selectedIndex);
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
              <p style={{ color: "white" }}>Slide {slideIndex} - {allImages.length} </p>
              
              <Button
                variant="outline-light"
                className="mr-2"
                onClick={gifToggle}
              >
                {buttonText}
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
             
            </Col>
          </Row>
        </Container>
      </div>
      <Carousel
        activeIndex={slideIndex}
        interval={slideSpeed}
        onSelect={handleSelect}
      >
        {allImages.map((image, i) => (
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
