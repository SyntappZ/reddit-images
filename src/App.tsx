import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Router from "./router/Router";
import SideBar from "./components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import TitleContainer from "./components/TitleContainer";
import { fetchSubreddits } from "./redux/navbarDataSlice";
import { fetchImages } from "./redux/redditImagesSlice";
import { useAppDispatch, useAppSelector } from "./redux/reduxHooks";
import { SearchObject } from "./interfaces/ReduxInterfaces";

function App() {
  const dispatch = useAppDispatch();
  const { after } = useAppSelector((state) => state.redditImages);
  const fetchNavbarLists = () => {
    const searchObject: SearchObject = {
      subreddit: "/r/pics",
      after: after,
    };
    dispatch(fetchSubreddits());
    //  dispatch(fetchImages(searchObject))
  };
  useEffect(() => {
    fetchNavbarLists();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="main-container">
          <SideBar />
          <TitleContainer />
          <Router />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
