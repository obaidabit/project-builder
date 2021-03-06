import React, { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import IFrame from "./components/IFrame";
import LeftSideMenu from "./components/LeftSideMenu";
import RightSideMenu from "./components/RightSideMenu";
import "./App.css";

export default function App() {
  const drop = (e) => {
    e.preventDefault();
    const element_id = e.dataTransfer.getData("element_id");
    const element = document.getElementById(element_id);
    const clone = element.cloneNode(true);
    e.target.appendChild(clone);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("element_id", target.id);
    e.dataTransfer.effectAllowed = "copy";
  };

  const dragOverC = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const iframepage = document.querySelector("iframe");
    iframepage.contentWindow.document.body.ondrop = drop;
    iframepage.contentWindow.document.body.ondragover = dragOver;
  }, []);

  return (
    <div className="app">
      <NavBar />
      <main className="main">
        <LeftSideMenu onDragStart={dragStart} onDragOver={dragOver} />
        <IFrame onDrop={drop} onDragOver={dragOver}></IFrame>
        <RightSideMenu />
      </main>
    </div>
  );
}
