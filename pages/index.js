import ReactStars from "react-stars";

import React, { useEffect } from "react";
import ChatFrom from "../components/chat/ChatForm";
export default function Home() {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <>
    <ChatFrom/>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={"#ffd700"}
      />
    </>
  );
}
