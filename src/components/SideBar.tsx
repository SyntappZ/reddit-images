import React from "react";
import { slide as Menu } from "react-burger-menu";
import { FaRedditSquare } from "react-icons/fa";
import MultiListItem from "./MultiListItem";
import { Container, Row } from "react-bootstrap";
import { useAppSelector } from "../redux/reduxHooks";
import { MultiListTypes } from "../interfaces/MainInterfaces";
import { FaHeart, FaCamera } from "react-icons/fa";
import { BiHappyAlt } from "react-icons/bi";

import "../css/sideBar.css";

const green = "#17a2b8";
const dark = "#3e4349";
const grey = "#dadada";

const SideBar = () => {
  const { photography, funny, favorites } = useAppSelector(
    (state) => state.subredditData
  );

  const catagories = [
    {
      title: "favorites",
      list: favorites,
      icon: <FaHeart color={green} />,
      eventKey: "0",
    },
    {
      title: "photography",
      list: photography,
      icon: <FaCamera color={green} />,
      eventKey: "1",
    },
    {
      title: "funny",
      list: funny,
      icon: <BiHappyAlt color={green} />,
      eventKey: "2",
    },
  ];

  return (
    <div>
      <Menu>
        <Container fluid>
          <Row>
            <div className="icon-wrap">
              <FaRedditSquare color={green} size="28" />
              <h4>Subreddits</h4>
            </div>
          </Row>

          <div className="multi-layer-list">
            {catagories.map(
              (catagory: MultiListTypes): JSX.Element => (
                <MultiListItem
                  key={catagory.title}
                  title={catagory.title}
                  list={catagory.list}
                  icon={catagory.icon}
                  eventKey={catagory.eventKey}
                />
              )
            )}
          </div>
        </Container>
      </Menu>
    </div>
  );
};

export default SideBar;
