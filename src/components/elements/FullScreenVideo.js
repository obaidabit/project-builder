import React from "react";
import Video from "./Video";

export default function FullScreenVideo() {
  return (
    <div data-name="FullSreen Video" className="video-container">
      <Video id="myVideo" muted autoPlay />

      <div className="content">
        <h1>Heading</h1>
        <p>Lorem ipsum...</p>
        <button id="myBtn">Pause</button>
      </div>
    </div>
  );
}
