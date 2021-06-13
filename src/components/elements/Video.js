import React from "react";

export default function Video(props) {
  return (
    <video
      className="video"
      draggable="true"
      data-name="video"
      data-edit={true}
      {...props}
    >
      <source
        src="./img/AHHHHHHHHHH (Alternate Extended) (Big Enough) [HD] (online-video-cutter.com).mp4"
        type="video/mp4"
      />
    </video>
  );
}
