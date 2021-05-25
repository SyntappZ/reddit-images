import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Router from "./router/Router";
import SideBar from "./components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import TitleContainer from "./components/TitleContainer";
import { fetchUserImages } from "./functions/movieDatabase";
import { fetchImages, addHistoryItems } from "./redux/redditImagesSlice";
import { useAppDispatch } from "./redux/reduxHooks";

function App() {
  const dispatch = useAppDispatch();

  const fetchDefaultImages = () => {
    dispatch(fetchImages("MostBeautiful"));
    dispatch(addHistoryItems());
  };
  useEffect(() => {
    
    fetchDefaultImages();
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
