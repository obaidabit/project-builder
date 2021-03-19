import React, { useEffect } from "react";
import NavBar from "./components/Navbar";
import IFrame from "./components/IFrame";
import LeftSideMenu from "./components/LeftSideMenu";
import RightSideMenu from "./components/RightSideMenu";
import ElementProvider from "./ElementContext";
import { dragStart, dragOver, drop, dragLeave, dragEnter } from "./drag";
import init from "./config/init";
import "./App.css";

export default function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <ElementProvider>
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
    </ElementProvider>
  );
}
