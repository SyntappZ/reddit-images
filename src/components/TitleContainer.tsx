import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import "../css/titleContainer.css";
import { useAppSelector } from "../redux/reduxHooks";

const TitleContainer = () => {
  const [onGallery, setOnGallery] = useState(true);
  const { currentSubreddit, images } = useAppSelector(
    (state) => state.redditImages
  );

  let location = useLocation();

  useEffect(() => {
    const gallery = location.pathname === "/";
    setOnGallery(gallery);
  }, [location]);

  const linkStyle = { color: "white", textDecoration: "none" };
  return (
    <div className="title-container">
      <Container fluid>
        <Row>
          <Col xs={6} md={4}>
            <div className="current-subreddit">
              <h5>r/{currentSubreddit}</h5>
              {/* <p>{images.length} Images</p> */}
            </div>
          </Col>
          <Col xs={12} md={8}>
            <div className="recent-list">
              <p>list</p>
              <p>list</p>
              <p>list</p>
              <p>list</p>
            </div>
          </Col>
        </Row>
        <Row>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="mr-4" aria-label="First group">
              <Button variant={onGallery ? "info" : "outline-info"}>
                <Link style={linkStyle} to="/">
                  Galery
                </Link>
              </Button>
              <Button variant={onGallery ? "outline-info" : "info"}>
                <Link style={linkStyle} to="/slideShow">
                  Slide Show
                </Link>
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
      </Container>
    </div>
  );
};

export default TitleContainer;
