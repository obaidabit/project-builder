import React from "react";

export default function LeftSideMenu({ ...props }) {
  return (
    <div className="left-side-menu">
      <h3>Left Menu</h3>
      <div className="elements">
        <div className="element" id="section" {...props} draggable="true">
          <p>Section</p>
        </div>
        <div className="element" id="button" {...props} draggable="true">
          <p>Button</p>
        </div>
        <div className="element" id="link" {...props} draggable="true">
          <p>Link</p>
        </div>
        <div className="element" id="navbar" {...props} draggable="true">
          <p>NavBar</p>
        </div>
      </div>
    </div>
  );
}
