import React, { useRef, useState } from "react";
import { CgClose, MdEdit } from "react-icons/all";
import savePage, { loadPage } from "../savePage";
import { clearUndoRecord } from "../undo";

export default function PageItem(props) {
  const [disabled, setDisabled] = useState(false);
  const pageRef = useRef(null);

  const handleName = (e) => {
    props.setPageName(e.target.value, props.index);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setDisabled(true);
    }
  };

  const handleDoubleClick = () => {
    setDisabled(false);
  };

  const handleDelete = () => {
    props.deleteItem(props.index);
    const iframe = document.querySelector("iframe");
    const html = iframe.contentDocument.querySelector("html");
    html.setAttribute("data-page-name", "page" + (props.index - 1));
    loadPage();
  };

  const handleClick = (e) => {
    if (e.target.tagName === "svg" || e.target.tagName === "path") return;

    const iframe = document.querySelector("iframe");
    const html = iframe.contentDocument.querySelector("html");

    const pages = document.querySelectorAll(".page");
    pages.forEach((page) => page.classList.remove("active-page"));
    pageRef.current.classList.add("active-page");

    if (localStorage.length >= props.index + 1) {
      if (html.getAttribute("data-page-name") === "page" + props.index) return;
      iframe.contentDocument.body.innerHTML = "";
      html.setAttribute("data-page-name", "page" + props.index);
      loadPage();
    } else {
      iframe.contentDocument.body.innerHTML = "";
      html.setAttribute("data-page-name", "page" + props.index);
      savePage();
    }

    clearUndoRecord();
    clearUndoRecord();
  };

  return (
    <div
      className={
        props.index === 0
          ? "page shadow p-1 m-t-1 active-page"
          : "page shadow p-1 m-t-1"
      }
      key={props.index}
      onClick={handleClick}
      ref={pageRef}
    >
      <input
        className="page-input"
        type="text"
        value={props.page}
        readOnly={disabled ? "readonly" : null}
        onChange={handleName}
        onKeyPress={handleEnter}
        onDoubleClick={handleDoubleClick}
      />
      <div>
        <MdEdit onClick={() => setDisabled(false)} />
        {props.index === 0 ? (
          ""
        ) : (
          <CgClose className="hover-red m-l-1" onClick={handleDelete} />
        )}
      </div>
    </div>
  );
}
