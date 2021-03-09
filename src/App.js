import React, { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import IFrame from "./components/IFrame";
import LeftSideMenu from "./components/LeftSideMenu";
import RightSideMenu from "./components/RightSideMenu";
import "./App.css";

let tempElement = null;
let inIframe = false;
const mousePosition = {
  x: 0,
  y: 0,
};

export default function App() {
  const [iframe, setIframe] = useState(null);
  const [oldBackground, setOldBackground] = useState(null);

  const dropPosition = (currentNode, targetNode) => {
    const currentRec = currentNode.getBoundingClientRect();
    const targetRec = targetNode.getBoundingClientRect();
    console.log(`current element :${currentRec.top + currentRec.height}`);
    console.log(`target element :${targetRec.top + targetRec.height}`);
    console.log(`mouse position : x:${mousePosition.x}, y:${mousePosition.y}`);

    if (targetRec.top + targetRec.height / 3 > mousePosition.y) {
      return "before";
    } else if (
      targetRec.top + targetRec.height / 3 < mousePosition.y &&
      targetRec.top + targetRec.height - targetRec.height / 3 < mousePosition.y
    ) {
      targetNode.style.borderBottom = "2px solid green";
      return "after";
    }
    return "add";
  };
  const SelectTag = (element) => {
    let tag = null;
    switch (element.id) {
      case "section":
        tag = document.createElement("section");
        tag.innerHTML = "Section";
        break;
      case "navbar":
        tag = document.createElement("nav");
        tag.innerHTML = "Navbar";
        break;
      case "link":
        tag = document.createElement("a");
        tag.innerHTML = "Link";
        tag.href = "#";
        break;
      case "button":
        tag = document.createElement("button");
        tag.innerHTML = "Button";
        break;
      default:
        break;
    }
    tag.style.border = "1px dotted #2196f3";
    tag.style.padding = "1rem";
    tag.draggable = true;
    return tag;
  };

  const dragEnter = (e) => {
    setOldBackground(e.target.style.background);
    e.target.style.background = "#afc7ff";
    if (tempElement.ownerDocument.querySelector("body").id === "target") {
      if (tempElement !== e.target) dropPosition(tempElement, e.target);
    }
  };

  const dragLeave = (e) => {
    e.target.style.background = oldBackground;
  };

  const drop = (e) => {
    e.preventDefault();
    let clone = null;
    if (e.target === tempElement) {
      e.target.style.background = oldBackground;
      return;
    }
    if (inIframe) {
      clone = tempElement;
      switch (dropPosition(tempElement, e.target)) {
        case "before":
          e.target.parentNode.insertBefore(tempElement, e.target);
          break;
        case "after":
          e.target.parentNode.insertBefore(tempElement, e.target.nextSibling);
          break;
        default:
          e.target.appendChild(clone);
          break;
      }
    } else {
      clone = tempElement.cloneNode(true);
      e.target.appendChild(clone);
    }
    //clone.contentEditable = true;
    e.target.style.background = oldBackground;
    e.target.style.borderBottom = "";
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragStart = (e) => {
    if (e.target.ownerDocument.querySelector("body").id === "target") {
      inIframe = true;
      tempElement = e.target;
    } else {
      inIframe = false;
      tempElement = SelectTag(e.target);
    }
  };

  const drag = (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
  };

  useEffect(() => {
    const frame = document.querySelector("iframe");
    if (frame) {
      frame.contentWindow.document.body.ondrag = drag;
      frame.contentWindow.document.body.ondrop = drop;
      frame.contentWindow.document.body.ondragover = dragOver;
      frame.contentWindow.document.body.ondragenter = dragEnter;
      frame.contentWindow.document.body.ondragleave = dragLeave;
      frame.contentWindow.document.body.ondragstart = dragStart;
      frame.contentWindow.document.body.id = "target";

      frame.contentWindow.addEventListener("click", (e) => {
        console.log(e.target);
      });
      frame.contentWindow.addEventListener("mouseover", (e) => {
        e.target.style.outline = "#66a2ff solid 2px";
      });
      frame.contentWindow.addEventListener("mouseout", (e) => {
        e.target.style.outline = "";
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
