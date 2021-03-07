import React, { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import IFrame from "./components/IFrame";
import LeftSideMenu from "./components/LeftSideMenu";
import RightSideMenu from "./components/RightSideMenu";
import "./App.css";
let tempElement = null;

export default function App() {
  const [iframe, setIframe] = useState(null);
  const [elementStyle, setElementStyle] = useState(null);

  const dragEnter = (e) => {
    setElementStyle(e.target.style);
    e.target.style.background = "#afc7ff";
  };

  const dragLeave = (e) => {
    e.target.style = elementStyle;
  };

  const drop = (e) => {
    e.preventDefault();
    const clone = tempElement.cloneNode(true);
    e.target.appendChild(clone);
    e.target.style = elementStyle;
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragStart = (e) => {
    tempElement = e.target;
  };

  useEffect(() => {
    const frame = document.querySelector("iframe");
    if (frame) {
      frame.contentWindow.document.body.ondrop = drop;
      frame.contentWindow.document.body.ondragover = dragOver;
      frame.contentWindow.document.body.ondragenter = dragEnter;
      frame.contentWindow.document.body.ondragleave = dragLeave;
      frame.contentWindow.document.body.ondragstart = dragStart;

      frame.contentWindow.addEventListener("click", (e) => {
        console.log(e.target);
      });
      setIframe(frame);
    }
  }, []);

  return (
    <div className="app">
      <NavBar />
      <main className="main">
        <LeftSideMenu onDragStart={dragStart} onDragOver={dragOver} />
        <IFrame
          onDrop={drop}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDragOver={dragOver}
        ></IFrame>
        <RightSideMenu />
      </main>
    </div>
  );
}
