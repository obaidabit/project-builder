import React, { useState, useContext, useEffect } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineArrowUp } from "react-icons/ai";
import { ElementContext2 } from "../ElementContext";
import savePage from "../savePage";
import { saveRecord, clearRedoRecord } from "../undo";
import { closeSelectBox, resize } from "../config/init";

export default function SelectBox(props) {
  const [selectedTarget, setSelectedTarget] = useContext(ElementContext2);
  const [name, setName] = useState("");

  const close = () => {
    closeSelectBox();
    props.containerEdit.setShowContainer(false);
    props.columnsEdit.setShowColumns(false);
    props.imageEdit.setShowImage(false);
    props.videoEdit.setShowVideo(false);
    props.linkEdit.setShowLink(false);
  };

  const remove = () => {
    close();
    if (selectedTarget.tagName === "BODY") {
      return;
    }
    saveRecord(selectedTarget, "remove");
    clearRedoRecord();
    selectedTarget.remove();
    savePage(false);
  };

  const showEdit = () => {
    switch (selectedTarget.dataset.name) {
      case "container":
        props.containerEdit.setShowContainer(
          !props.containerEdit.showContainer
        );
        break;
      case "columns":
        props.columnsEdit.setShowColumns(!props.columnsEdit.showColumns);
        break;
      case "image":
        props.imageEdit.setShowImage(!props.imageEdit.showImage);
        break;
      case "video":
        props.videoEdit.setShowVideo(!props.videoEdit.showVideo);
        break;
      case "link":
        props.linkEdit.setShowLink(!props.linkEdit.showLink);
        break;
      default:
        break;
    }
  };

  const selectParent = () => {
    if (selectedTarget) {
      setSelectedTarget(selectedTarget.parentNode);
      resize(selectedTarget.parentNode, document.querySelector("iframe"), null);
    }
  };

  useEffect(() => {
    if (selectedTarget.tagName)
      setName(
        selectedTarget.dataset.name
          ? selectedTarget.dataset.name.toLowerCase()
          : selectedTarget.tagName.toLowerCase()
      );
  }, [selectedTarget]);

  return (
    <div className="selected-element">
      <p className="tag-name">{name}</p>
      <div className="tools">
        {selectedTarget.dataset.edit ? (
          <button onClick={showEdit}>
            <IoSettingsSharp className="tools-icon" fill="white" />
          </button>
        ) : null}
        {selectedTarget.tagName === "BODY" ? null : (
          <>
            <button onClick={remove}>
              <img className="tools-icon" src="img/remove.svg" alt="" />
            </button>
            <button onClick={selectParent}>
              <AiOutlineArrowUp fill="#fff" className="tools-icon" />
            </button>
          </>
        )}
        <button onClick={close}>
          <img className="tools-icon" src="img/cancel.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
