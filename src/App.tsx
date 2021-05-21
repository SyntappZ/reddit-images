import React from "react";
import Nav from "./components/Nav";
import FigherScreen from "./components/ImagesPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="container">
        <FigherScreen />
      </div>
    </div>
  );
}

export default App;
