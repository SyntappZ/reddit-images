import { stat } from "node:fs";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/titleContainer.css";
import { useAppSelector } from "../redux/reduxHooks";

const TitleContainer = () => {
  const {currentSubreddit} = useAppSelector((state) => state.redditImages)
  return (
    <div className="title-container">
      <Container fluid>
        <Row>
          <Col xs={6} md={4}>
            <div className="current-subreddit">
              <h5>{currentSubreddit}</h5>
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
      </Container>
    </div>
  );
};

export default TitleContainer;
