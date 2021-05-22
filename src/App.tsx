import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import ImagePage from "./components/ImagesPage";
import SideBar from "./components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { fetchSubreddits } from "./redux/subredditDataSlice";
import { useAppDispatch } from "./redux/reduxHooks";

function App() {
  const dispatch = useAppDispatch();

  const fetchNavbarLists = () => {
    dispatch(fetchSubreddits());
  };
  useEffect(() => {
    fetchNavbarLists();
  }, []);
  return (
    <div className="App">
      <NavBar />
      <SideBar />
      <ImagePage />
    </div>
  );
}

export default App;
