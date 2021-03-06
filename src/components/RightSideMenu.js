import React from "react";

export default function RightSideMenu() {
  return (
    <div className="right-side-menu">
      <h3>Right Menu</h3>
      <div className="elements">
        <div className="element" draggable="true">
          <p>Element One</p>
        </div>
        <div className="element" draggable="true">
          <p>Element Two</p>
        </div>
        <div className="element" draggable="true">
          <p>Element Three</p>
        </div>
        <div className="element" draggable="true">
          <p>Element Four</p>
        </div>
      </div>
    </div>
  );
}
