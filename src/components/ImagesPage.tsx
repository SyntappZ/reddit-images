import React, { useState } from "react";
import {
  fetchImageData,
  fetchGifSubreddits,
  fetchImageSubreddits,
} from "../functions/movieDatabase";
import { subreddits } from "../data/subreddits";
import "../css/imagesPage.css";
import { Button } from "react-bootstrap";
const ImagesPage = () => {
  const [message, setMessage] = useState("");
  const [after, setAfter] = useState("");
  const redditFetch = async () => {
    console.log(subreddits.photography);
    // const data = await fetchGifSubreddits();
    // if(data) {
    //   console.log(data)
    // }else{

    //   setMessage('Please enter a valid subreddit')
    // }
  };
  return (
    <div className="images-page">
      {/* <h1 style={{color: 'white'}}>{message}</h1>
      <Button  onClick={redditFetch} >click me</Button>    */}
    </div>
  );
};

export default ImagesPage;
