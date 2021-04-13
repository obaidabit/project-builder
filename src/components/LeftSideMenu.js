import React from "react";

export default function LeftSideMenu({ ...props }) {
  return (
    <div className="left-side-menu">
      <div className="tabs shadow">
        <button>
          <p>Elements</p>
        </button>
        <button>
          <p>Layout</p>
        </button>
        <button>
          <p>Tab 3</p>
        </button>
      </div>
      <div className="elements">
        <div
          className="element shadow"
          id="section"
          {...props}
          draggable="true"
        >
          <img
            draggable="false"
            className="img-ele"
            src="img/light/section.svg"
            alt="button"
          />
          <p>Section</p>
        </div>
        <div className="element shadow" id="button" {...props} draggable="true">
          <img
            draggable="false"
            className="img-ele"
            src="img/light/button.svg"
            alt="button"
          />
          <p>Button</p>
        </div>
        <div className="element shadow" id="link" {...props} draggable="true">
          <img
            draggable="false"
            className="img-ele"
            src="img/light/link.svg"
            alt="link"
          />
          <p>Link</p>
        </div>
        <div className="element shadow" id="navbar" {...props} draggable="true">
          <img
            draggable="false"
            className="img-ele"
            src="img/light/navbar.svg"
            alt="link"
          />
          <p>NavBar</p>
        </div>
        <div
          className="element shadow"
          id="input-text"
          {...props}
          draggable="true"
        >
          <img
            draggable="false"
            className="img-ele"
            src="img/light/input.svg"
            alt="link"
          />
          <p>Input text</p>
        </div>
        <div className="element shadow" id="image" {...props} draggable="true">
          <img
            draggable="false"
            className="img-ele"
            src="img/light/image.svg"
            alt="link"
          />
          <p>Image</p>
        </div>
        <div className="element shadow" id="video" {...props} draggable="true">
          <img
            draggable="false"
            className="img-ele"
            src="img/light/youtube.svg"
            alt="video"
          />
          <p>Video</p>
        </div>

        <div
          className="element shadow"
          id="radio-button"
          {...props}
          draggable="true"
        >
          <img
            draggable="false"
            className="img-ele"
            src="img/light/radio-button.svg"
            alt="video"
          />
          <p>Radio</p>
        </div>
        <div className="element shadow" id="test" {...props} draggable="true">
          <h4>Test</h4>
        </div>
        {/*<div className="element" id="check-button" {...props} draggable="true">
          <p>Check Button</p>
        </div>
        */}
      </div>
    </div>
  );
}
