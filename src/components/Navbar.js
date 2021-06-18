import React, { useRef } from "react";
import { undo, redo } from "../undo";
import { MdUndo, MdRedo } from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";
import { closeSelectBox } from "../config/init";
import { saveRecord, clearRedoRecord } from "../undo";
import download from "./downloadPage";
export default function Navbar(props) {
   const headref = useRef();

   const clearPage = () => {
      localStorage.clear();
      const iframeDocument =
         document.querySelector("iframe").contentWindow.document;
      saveRecord(iframeDocument, "clear-page");
      clearRedoRecord();
      iframeDocument.body.innerHTML = "";
      closeSelectBox();
      props.closeEdit();
   };

   const changeScreen = (e) => {
      const iframe = document.querySelector("iframe");

      if (iframe) {
         switch (e.target.children[0].alt) {
            case "phone":
               iframe.style.width = "320px";
               break;
            case "tablet":
               iframe.style.width = "768px";
               break;
            default:
               iframe.style.width = "100%";
               break;
         }
         const btns = document.querySelectorAll(".screen-group .screen-btn");

         btns.forEach((item) => {
            item.classList.remove("btn-selected");
         });
         e.target.classList.add("btn-selected");
      }
   };

   const toggleFullScreen = (e) => {
      if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen();
         e.target.classList.add("btn-selected");
      } else {
         if (document.exitFullscreen) {
            document.exitFullscreen();
            e.target.classList.remove("btn-selected");
         }
      }
   };

   const toggleTargetPage = () => {
      const targetPage = document.querySelector(".target-page");
      const hidePageBtn = document.querySelector(".hide-page");
      const doc = document.querySelector("iframe").contentWindow.document;

      if (targetPage.classList.contains("show-target-page")) {
         targetPage.classList.remove("show-target-page");
         hidePageBtn.classList.add("hide");
         doc.body.classList.add("dash-elements");
         headref.current.classList.add("show-header");
      } else {
         targetPage.classList.add("show-target-page");
         hidePageBtn.classList.remove("hide");
         doc.body.classList.remove("dash-elements");
         headref.current.classList.remove("show-header");
      }
   };

   const toggleDash = (e) => {
      const doc = document.querySelector("iframe").contentWindow.document;
      if (doc) {
         if (doc.body.classList.contains("dash-elements")) {
            doc.body.classList.remove("dash-elements");
            e.target.classList.remove("btn-selected");
         } else {
            doc.body.classList.add("dash-elements");
            e.target.classList.add("btn-selected");
         }
      }
   };

   return (
      <header className="show-header" ref={headref}>
         <div className="navbar shadow">
            <h3>Logo</h3>
            <button onClick={toggleTargetPage} className="hide hide-page">
               <img src="img/light/hide.svg" alt="full screen button" />
            </button>

            <div className="screen-group">
               <button onClick={changeScreen} className="screen-btn" title="Phone">
                  <img src="img/light/phone.svg" alt="phone" />
               </button>
               <button onClick={changeScreen} className="screen-btn" title="Tablet">
                  <img src="img/light/tablet.svg" alt="tablet" />
               </button>
               <button
                  onClick={changeScreen}
                  className="screen-btn btn-selected"
                  title="Monitor"
               >
                  <img src="img/light/monitor.svg" alt="monitor" />
               </button>
            </div>

            <div className="tools-group">
               <button onClick={download} className="screen-btn" title="download page">
                  <img src="img/light/full-screen.svg" alt="download " />
               </button>
               <button onClick={clearPage} className="screen-btn" title="Clear page">
                  <AiOutlineClear />
               </button>
               <button
                  onClick={toggleDash}
                  className="screen-btn btn-selected"
                  title="Dash elements"
               >
                  <img src="img/light/shape.svg" alt="outline" />
               </button>
               <button
                  onClick={toggleTargetPage}
                  className="screen-btn"
                  title="View page"
               >
                  <img src="img/light/visibility.svg" alt="show page button" />
               </button>
               <button
                  onClick={toggleFullScreen}
                  className="screen-btn"
                  title="Full screen"
               >
                  <img src="img/light/full-screen.svg" alt="full screen button" />
               </button>
               <button onClick={undo} className="screen-btn" title="Undo">
                  <MdUndo />
               </button>
               <button onClick={redo} className="screen-btn" title="Redo">
                  <MdRedo />
               </button>
            </div>
         </div>
      </header>
   );
}
