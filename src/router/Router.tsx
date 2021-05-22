import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import ImagesPage from "../pages/ImagesPage";
import GifsPage from "../pages/GifsPage";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ImagesPage />
      </Route>
      <Route path="/gifs">
        <GifsPage />
      </Route>
    </Switch>
  );
};

export default Router;
