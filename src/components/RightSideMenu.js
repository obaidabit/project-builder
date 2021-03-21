import React from "react";
import General from "../General";

export default function RightSideMenu(props) {
  function show(e) {
    if (e.target.parentNode.nextElementSibling.style.display === "none") {
      e.target.parentNode.nextElementSibling.style.display = "grid";
      e.target.parentElement.querySelector("img").src = "img/light/line.svg";
    } else {
      e.target.parentNode.nextElementSibling.style.display = "none";
      e.target.parentElement.querySelector("img").src = "img/light/plus.svg";
    }
  }

  return (
    <div className="right-side-menu">
      <div className="styles" style={{ display: "none" }}>
        <div className="group">
          <div className="toggle" onClick={show}>
            <h4>General</h4>
            <img src="img/light/plus.svg" alt="" />
          </div>
          <General />
        </div>
      </div>
    </div>
  );
}
