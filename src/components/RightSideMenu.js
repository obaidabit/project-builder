import React from "react";
import Settings from "./ComponentsRight/Setting/Settings";
import General from "./ComponentsRight/general/General";
import Dimension from "./ComponentsRight/dimension/Dimension";
import Typography from "./ComponentsRight/typography/Typography";
import Decorations from "./ComponentsRight/decorations/Decorations";
import Extra from "./ComponentsRight/extra/Extra";
import Flex from "./ComponentsRight/flex/Flex";

export default function RightSideMenu() {
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
            <h4>Settings</h4>
            <img src="img/light/plus.svg" alt="" />
          </div>
          <Settings />
        </div>

        <div className="group">
          <div className="toggle" onClick={show}>
            <h4>General</h4>
            <img src="img/light/plus.svg" alt="" />
          </div>
          <General />
        </div>

        <div className="group">
          <div className="toggle" onClick={show}>
            <h4>Dimension</h4>
            <img src="img/light/plus.svg" alt="" />
          </div>
          <Dimension />
        </div>

        <div className="group">
          <div className="toggle" onClick={show}>
            <h4>Typography</h4>
            <img src="img/light/plus.svg" alt="" />
          </div>
          <Typography />
        </div>

        <div className="group">
          <div className="toggle" onClick={show}>
            <h4>Decorations</h4>
            <img src="img/light/plus.svg" alt="" />
          </div>
          <Decorations />
        </div>
        <div className="group">
          <div className="toggle" onClick={show}>
            <h4>Extra</h4>
            <img src="img/light/plus.svg" alt="" />
          </div>
          <Extra />
        </div>
        <div className="group">
          <div className="toggle" onClick={show}>
            <h4>Flex</h4>
            <img src="img/light/plus.svg" alt="" />
          </div>
          <Flex />
        </div>
      </div>
    </div>
  );
}
