import React from "react";

export default function Image({ classes, src }) {
  return (
    <img
      className={classes ? classes : "image"}
      data-name="image"
      data-edit={true}
      src={src ? src : "./img/placeholder.png"}
      alt=""
    />
  );
}
