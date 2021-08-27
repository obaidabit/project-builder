import React, { useState } from "react";
import { BiText } from "react-icons/bi";
import { AiOutlineLine, AiOutlineBars, AiOutlineForm } from "react-icons/ai";
import {
  MdRadioButtonChecked,
  MdShortText,
  MdVideoLabel,
} from "react-icons/md";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { RiCheckboxLine } from "react-icons/ri";
import { BsTextareaT } from "react-icons/bs";
import Pages from "./Pages";

export default function LeftSideMenu({ ...props }) {
  const [tabIndex, setTabIndex] = useState(1);
  const [layout, setLayout] = useState(true);
  const [basics, setBasics] = useState(true);
  const [media, setMedia] = useState(true);
  const [form, setForm] = useState(true);
  const [extra, setExtra] = useState(true);
  const [homePage, setHomePage] = useState(true);
  const [logInPage, setLogInPage] = useState(true);

  const toggleTab = (index) => {
    setTabIndex(index);
  };

  const toggleLayout = () => {
    setLayout(!layout);
  };
  const toggleHomePage = () => {
    setHomePage(!homePage);
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

  const toggleLogInPage = () => {
    setLogInPage(!logInPage);
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
              src="img/light/two-columns.svg"
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
              src="img/light/three-columns.svg"
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
              src="img/light/container.svg"
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
              src="img/light/columns.svg"
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
            <AiOutlineBars draggable="false" className="img-ele" />

            <p>List</p>
          </div>
          <div
            className="element shadow"
            id="listitem"
            {...props}
            draggable="true"
          >
            <AiOutlineLine draggable="false" className="img-ele" />

            <p>List Item</p>
          </div>
          <div className="element shadow" id="text" {...props} draggable="true">
            <BiText className="img-ele" />
            <p>Text</p>
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
            <AiOutlineVideoCamera draggable="false" className="img-ele" />

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
            <AiOutlineForm draggable="false" className="img-ele" />

            <p>Form</p>
          </div>
          <div
            className="element shadow"
            id="label"
            {...props}
            draggable="true"
          >
            <MdShortText draggable="false" className="img-ele" />

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
            <MdRadioButtonChecked draggable="false" className="img-ele" />

            <p>Radio</p>
          </div>
          <div
            className="element shadow"
            id="checkbox"
            {...props}
            draggable="true"
          >
            <RiCheckboxLine draggable="false" className="img-ele" />
            <p>Checkbox</p>
          </div>
          <div
            className="element shadow"
            id="textarea"
            {...props}
            draggable="true"
          >
            <BsTextareaT draggable="false" className="img-ele" />
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
              src="img/light/dropdown.svg"
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
              src="img/light/input-button.svg"
              alt="video"
            />
            <p>Button</p>
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
          <div
            className="element shadow"
            id="slideshow"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/slider.svg"
              alt="link"
            />
            <p>SlideShow</p>
          </div>
          <div className="element shadow" id="tabs" {...props} draggable="true">
            <img
              draggable="false"
              className="img-ele"
              src="img/light/tabs.svg"
              alt="link"
            />
            <p>Tabs</p>
          </div>
          <div
            className="element shadow"
            id="fullscreen"
            {...props}
            draggable="true"
          >
            <MdVideoLabel draggable="false" className="img-ele" />

            <p>FullScreen Video</p>
          </div>
          <div className="element shadow" id="hero" {...props} draggable="true">
            <img
              draggable="false"
              className="img-ele"
              src="img/light/hero.svg"
              alt="link"
            />
            <p>Hero</p>
          </div>
        </div>
      </div>
      <div className={tabIndex === 2 ? "group-elements p-x-1" : "hide"}>
        <div className="toggle p-2 m-t-1  " onClick={toggleHomePage}>
          <h5>Home Page</h5>
          <img
            src={homePage ? "img/light/line.svg" : "img/light/plus.svg"}
            alt=""
          />
        </div>
        <div className={homePage ? "elements" : "hide"}>
          <div
            className="element shadow"
            id="shoesLayout"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/section.svg"
              alt="button"
            />
            <p>ShoesStore</p>
          </div>
          <div
            className="element shadow"
            id="parallaxLayout"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/section.svg"
              alt="button"
            />
            <p>ParallaxSite</p>
          </div>
        </div>
        <div className="toggle p-2 m-t-1  " onClick={toggleLogInPage}>
          <h5>LogIn Page</h5>
          <img
            src={logInPage ? "img/light/line.svg" : "img/light/plus.svg"}
            alt=""
          />
        </div>
        <div className={logInPage ? "elements" : "hide"}>
          <div
            className="element shadow"
            id="violetLogInLayout"
            {...props}
            draggable="true"
          >
            <img
              draggable="false"
              className="img-ele"
              src="img/light/section.svg"
              alt="button"
            />
            <p>LogIn</p>
          </div>
        </div>
      </div>
      <div className={tabIndex === 3 ? "group-elements p-x-1" : "hide"}>
        <Pages />
      </div>
    </div>
  );
}
