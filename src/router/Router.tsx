import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import ImagesPage from "../pages/ImagesPage";
import FavoritesPage from "../pages/FavoritesPage";
import SlideShowPage from "../pages/SlideShowPage";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ImagesPage />
      </Route>
      <Route path="/slideShow">
        <SlideShowPage />
      </Route>
      <Route path="/favoritesPage">
        <FavoritesPage />
      </Route>
    </Switch>
  );
};

export default Router;
