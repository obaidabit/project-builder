import React, { useState } from "react";
import NavBar from "./components/Navbar";
import IFrame from "./components/IFrame";
import LeftSideMenu from "./components/LeftSideMenu";
import RightSideMenu from "./components/RightSideMenu";

import "./App.css";

export default function App() {
  const [element, setElement] = useState(null);

  const drop = (e) => {
    e.preventDefault();
    console.log(e.target);
    e.target.appendChild(element);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragStart = (e) => {
    const target = e.target;
    setElement(target);
    e.dataTransfer.setData("card_id", target.id);
  };

  const dragOverC = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="app">
      <NavBar />
      <main className="main">
        <LeftSideMenu onDragStart={dragStart} onDragOver={dragOverC} />
        <IFrame onDrop={drop} onDragOver={dragOver} />
        <RightSideMenu onDragStart={dragStart} onDragOver={dragOverC} />
      </main>
    </div>
  );
}
