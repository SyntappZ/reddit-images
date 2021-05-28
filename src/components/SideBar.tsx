import React from "react";
import { slide as Menu } from "react-burger-menu";
import { FaRedditSquare } from "react-icons/fa";
import MultiListItem from "./MultiListItem";
import { Container, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../redux/reduxHooks";
import { Category } from "../interfaces/MainInterfaces";
import { FaHeart, FaCamera, FaHistory } from "react-icons/fa";
import { BiHappyAlt } from "react-icons/bi";
import { AiOutlineFileGif } from "react-icons/ai";

import { fetchImages } from "../redux/redditImagesSlice";
import "../css/sideBar.css";

const green = "#17a2b8";
// const dark = "#3e4349";
// const grey = "#dadada";

const SideBar = () => {
  const { photography, memes, favorites, gifs } = useAppSelector(
    (state) => state.subredditData
  );

  const { history } = useAppSelector((state) => state.redditImages);

  const dispatch = useAppDispatch();

  const sendName = (subreddit: string) => {
    dispatch(fetchImages(subreddit));
  };

  const categories = [
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
      title: "memes",
      list: memes,
      icon: <BiHappyAlt color={green} />,
      eventKey: "2",
    },
    {
      title: "recent",
      list: history,
      icon: <FaHistory color={green} />,
      eventKey: "5",
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
            {categories.map(
              (category: Category): JSX.Element => (
                <MultiListItem
                  key={category.title}
                  title={category.title}
                  list={category.list}
                  icon={category.icon}
                  eventKey={category.eventKey}
                  sendName={sendName}
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
