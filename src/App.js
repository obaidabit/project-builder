import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import IFrame from "./components/IFrame";
import LeftSideMenu from "./components/LeftSideMenu";
import RightSideMenu from "./components/RightSideMenu";
import ElementProvider from "./ElementContext";
import SelectBox from "./components/SelectBox";
import ContainerEdit from "./components/ContainerEdit";
import ColumnsEdit from "./components/ColumnsEdit";
import { dragStart, dragOver, drop, dragLeave, dragEnter } from "./drag";
import init from "./config/init";
import savePage from "./savePage";
import "./App.css";
import ImageEdit from "./components/ImageEdit";
import VideoEdit from "./components/VideoEdit";
import LinkEdit from "./components/LinkEdit";

export default function App() {
  const [showContainer, setShowContainer] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showLink, setShowLink] = useState(false);

  const closeEdit = () => {
    setShowContainer(false);
    setShowColumns(false);
    setShowImage(false);
    setShowVideo(false);
    setShowLink(false);
  };

  useEffect(() => {
    init();
    savePage(true);
  }, []);

  return (
    <ElementProvider>
      <div className="app">
        <NavBar closeEdit={closeEdit} />
        <main className="main">
          <LeftSideMenu onDragStart={dragStart} onDragOver={dragOver} />
          <IFrame
            closeEdit={closeEdit}
            onDrop={drop}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragOver={dragOver}
          ></IFrame>
          <RightSideMenu />
        </main>
        <SelectBox
          containerEdit={{ showContainer, setShowContainer }}
          columnsEdit={{ showColumns, setShowColumns }}
          imageEdit={{ showImage, setShowImage }}
          videoEdit={{ showVideo, setShowVideo }}
          linkEdit={{ showLink, setShowLink }}
        />
        <ContainerEdit show={showContainer} hide={setShowContainer} />
        <ColumnsEdit show={showColumns} hide={setShowColumns} />
        <ImageEdit show={showImage} hide={setShowImage} />
        <VideoEdit show={showVideo} hide={setShowVideo} />
        <LinkEdit show={showLink} hide={setShowLink} />
      </div>
    </ElementProvider>
  );
}
