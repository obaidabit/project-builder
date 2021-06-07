import React, { useState, useContext, useEffect } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { ElementContext2 } from "../ElementContext";
import savePage from "../savePage";
import { saveRecord, clearRedoRecord } from "../undo";

export default function SelectBox(props) {
  const [selectedTarget] = useContext(ElementContext2);
  const [name, setName] = useState("");

  const close = () => {
    const iframe = document.querySelector("iframe");
    const tool = document.querySelector(".selected-element");
    const editable =
      iframe.contentWindow.document.querySelectorAll("[contenteditable]");
    editable.forEach((item) => {
      if (item.contentEditable) item.contentEditable = false;
    });
    tool.style.display = "none";
    props.containerEdit.setShowContainer(false);
    props.columnsEdit.setShowColumns(false);
    props.imageEdit.setShowImage(false);
    props.videoEdit.setShowVideo(false);
  };

  const remove = () => {
    if (selectedTarget.tagName === "BODY") {
      close();
      return;
    }
    saveRecord(selectedTarget, "remove");
    clearRedoRecord();
    close();
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
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedTarget.tagName) setName(selectedTarget.tagName.toLowerCase());
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
          <button onClick={remove}>
            <img className="tools-icon" src="img/remove.svg" alt="" />
          </button>
        )}
        <button onClick={close}>
          <img className="tools-icon" src="img/cancel.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
