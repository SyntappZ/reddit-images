import React from "react";
import NavBar from "./components/NavBar";
import ImagePage from "./components/ImagesPage";
import SideBar from "./components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SideBar />
      <ImagePage />
    </div>
  );
}

export default App;
