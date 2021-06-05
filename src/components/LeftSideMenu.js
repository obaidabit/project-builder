import React, { useState } from "react";

export default function LeftSideMenu({ ...props }) {
  const [tabIndex, setTabIndex] = useState(1);
  const [layout, setLayout] = useState(true);
  const [basics, setBasics] = useState(true);
  const [media, setMedia] = useState(true);
  const [form, setForm] = useState(true);
  const [extra, setExtra] = useState(true);

  const toggleTab = (index) => {
    setTabIndex(index);
  };

  const toggleLayout = () => {
    setLayout(!layout);
  };

  const toggleBasics = () => {
    setBasics(!basics);
  };

  const toggleMedia = () => {
    setMedia(!media);
  };

  const toggleForm = () => {
    setForm(!form);
  };

  const toggleExtra = () => {
    setExtra(!extra);
  };

  return (
    <div className="left-side-menu">
      <div className="tabs shadow">
        <div
          className={tabIndex === 1 ? "tab active-tab" : "tab"}
          onClick={() => toggleTab(1)}
        >
          <p>Elements</p>
        </div>
        <div
          className={tabIndex === 2 ? "tab active-tab" : "tab"}
          onClick={() => toggleTab(2)}
        >
          <p>Layouts</p>
        </div>
        <div
          className={tabIndex === 3 ? "tab active-tab" : "tab"}
          onClick={() => toggleTab(3)}
        >
          <p>Pages</p>
        </div>
      </div>

      <div className={tabIndex === 1 ? "group-elements p-x-1" : "hide"}>
        <div className="toggle p-2 m-t-1  " onClick={toggleLayout}>
          <h5>Layout</h5>
          <img
            src={layout ? "img/light/line.svg" : "img/light/plus.svg"}
            alt=""
          />
        </div>

        <div className={layout ? "elements" : "hide"}>
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
          <div
            className="element shadow"
            id="2column"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/section.svg"
              alt="button"
            />
            <p>2 Column</p>
          </div>
          <div
            className="element shadow"
            id="3column"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/section.svg"
              alt="button"
            />
            <p>3 Column</p>
          </div>
          <div
            className="element shadow"
            id="container"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/section.svg"
              alt="button"
            />
            <p>Container</p>
          </div>
          <div
            className="element shadow"
            id="columns"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/section.svg"
              alt="button"
            />
            <p>Columns</p>
          </div>
        </div>
        <div className="toggle p-2 m-t-1  " onClick={toggleBasics}>
          <h5>Basic</h5>
          <img
            src={basics ? "img/light/line.svg" : "img/light/plus.svg"}
            alt=""
          />
        </div>
        <div className={basics ? "elements" : "hide"}>
          <div
            className="element shadow"
            id="button"
            {...props}
            draggable="true"
          >
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
          <div className="element shadow" id="list" {...props} draggable="true">
            <img
              draggable="false"
              className="img-ele"
              src="img/light/link.svg"
              alt="link"
            />
            <p>List</p>
          </div>
          <div
            className="element shadow"
            id="listitem"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/link.svg"
              alt="link"
            />
            <p>List Item</p>
          </div>
          <div className="element shadow" id="test" {...props} draggable="true">
            <h4>Test</h4>
          </div>
        </div>
        <div className="toggle p-2 m-t-1  " onClick={toggleMedia}>
          <h5>Media</h5>
          <img
            src={media ? "img/light/line.svg" : "img/light/plus.svg"}
            alt=""
          />
        </div>
        <div className={media ? "elements" : "hide"}>
          <div
            className="element shadow"
            id="image"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/image.svg"
              alt="link"
            />
            <p>Image</p>
          </div>
          <div
            className="element shadow"
            id="video"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/youtube.svg"
              alt="video"
            />
            <p>Video</p>
          </div>
        </div>
        <div className="toggle p-2 m-t-1 " onClick={toggleForm}>
          <h5>Form</h5>
          <img
            src={form ? "img/light/line.svg" : "img/light/plus.svg"}
            alt=""
          />
        </div>
        <div className={form ? "elements" : "hide"}>
          <div
            className="element shadow"
            id="form-block"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/input.svg"
              alt="link"
            />
            <p>Form block</p>
          </div>
          <div
            className="element shadow"
            id="label"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/input.svg"
              alt="link"
            />
            <p>Label</p>
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
          <div
            className="element shadow"
            id="checkbox"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/radio-button.svg"
              alt="video"
            />
            <p>Checkbox</p>
          </div>
          <div
            className="element shadow"
            id="textarea"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/radio-button.svg"
              alt="video"
            />
            <p>Text Area</p>
          </div>
          <div
            className="element shadow"
            id="select"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/radio-button.svg"
              alt="video"
            />
            <p>Select</p>
          </div>
          <div
            className="element shadow"
            id="form-button"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/radio-button.svg"
              alt="video"
            />
            <p>Form button</p>
          </div>
        </div>
        <div className="toggle p-2 m-t-1 " onClick={toggleExtra}>
          <h5>Extra</h5>
          <img
            src={extra ? "img/light/line.svg" : "img/light/plus.svg"}
            alt=""
          />
        </div>
        <div className={extra ? "elements" : "hide"}>
          <div
            className="element shadow"
            id="navbar"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/navbar.svg"
              alt="link"
            />
            <p>NavBar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
