import React, {useState} from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  Container,
} from "react-bootstrap";
import "../css/nav.css";
import { SearchObject } from "../interfaces/ReduxInterfaces";
import { fetchImages } from "../redux/redditImagesSlice";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
function NavBar() {
  const [inputValue, setInputValue] = useState<string>('')
  const { after, currentSubreddit } = useAppSelector((state) => state.redditImages);
  const dispatch = useAppDispatch()
  const linkStyle = {
    color: "hsla(0,0%,100%,.5)",
    textDecoration: "none",
  };

  const searchReddit = () => {
    const subreddit = `/r/${inputValue}`
    
    const searchObject: SearchObject = {
      subreddit: subreddit,
      after: after,
    };
    dispatch(fetchImages(searchObject))
  }
  return (
    <Navbar bg="dark" variant="dark" fixed="top"  className="py-4">
      <Container fluid="md">
        <Navbar.Brand>Reddit Images</Navbar.Brand>
        <Nav className="mr-auto">
          <Navbar.Text className="link">
            <Link style={linkStyle} to="/">
              Images
            </Link>
          </Navbar.Text>
          <Navbar.Text className="link">
            <Link style={linkStyle} to="/gifs">
              Gifs
            </Link>
          </Navbar.Text>
        </Nav>

        <Form inline>
          <FormControl
            type="text"
            placeholder="/r/Subreddit"
            className="mr-sm-2"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={searchReddit} variant="outline-info">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar;
