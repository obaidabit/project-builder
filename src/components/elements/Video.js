import React from "react";

export default function Video(props) {
  return (
    <video
      className="video"
      draggable="true"
      data-name="video"
      data-edit={true}
      autoPlay="true"
      {...props}
    >
      <source
        src="https://cdn.videvo.net/videvo_files/video/free/2014-07/large_watermarked/Run_5_wo_metadata_h264420_720p_UHQ_preview.mp4"
        type="video/mp4"
      />
    </video>
  );
}
