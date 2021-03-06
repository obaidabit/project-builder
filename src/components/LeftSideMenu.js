import React from "react";

export default function LeftSideMenu({ ...props }) {
  return (
    <div className="left-side-menu">
      <h3>Left Menu</h3>
      <div className="elements">
        <div className="element" id="card1" {...props} draggable="true">
          <p>Element One</p>
        </div>
        <div className="element" id="card2" {...props} draggable="true">
          <p>Element Two</p>
        </div>
        <div className="element" id="card3" {...props} draggable="true">
          <p>Element Three</p>
        </div>
        <div className="element" id="card4" {...props} draggable="true">
          <p>Element Four</p>
        </div>
      </div>
    </div>
  );
}
