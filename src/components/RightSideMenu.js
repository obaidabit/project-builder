import React from "react";
import General from "../General";

export default function RightSideMenu(props) {
  function show(e) {
    if (e.target.nextElementSibling.style.display === "none")
      e.target.nextElementSibling.style.display = "block";
    else e.target.nextElementSibling.style.display = "none";
  }

  return (
    <div className="right-side-menu">
      <h3>Right Menu </h3>
      <div className="elements" style={{ display: "none" }}>
        <div onClick={show}>General</div>
        <General />
      </div>
    </div>
  );
}
