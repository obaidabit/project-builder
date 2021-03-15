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
        <div className="element" id="input-text" {...props} draggable="true">
          <p>input text</p>
        </div>
        <div className="element" id="image" {...props} draggable="true">
          <p>image</p>
        </div>
        <div className="element" id="video" {...props} draggable="true">
          <p>video</p>
        </div>

        { <div className="element" id="radio-button" {...props} draggable="true">
          <p>Radio Button</p>
        </div>
        /*<div className="element" id="check-button" {...props} draggable="true">
          <p>Check Button</p>
        </div>
 */}
      </div>
    </div>
  );
}
