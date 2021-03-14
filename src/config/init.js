import { changeElement } from "../components/changeStyle";
import { drag, dragStart, dragOver, drop, dragLeave, dragEnter } from "../drag";

const init = () => {
  const frame = document.querySelector("iframe");
  let link = document.createElement("link");
  link.href = "elements-style.css"; /**** your CSS file ****/
  link.rel = "stylesheet";
  link.type = "text/css";
  if (frame) {
    frame.contentWindow.document.head.appendChild(link);
    frame.contentWindow.document.body.ondrag = drag;
    frame.contentWindow.document.body.ondrop = drop;
    frame.contentWindow.document.body.ondragover = dragOver;
    frame.contentWindow.document.body.ondragenter = dragEnter;
    frame.contentWindow.document.body.ondragleave = dragLeave;
    frame.contentWindow.document.body.ondragstart = dragStart;
    frame.contentWindow.document.body.id = "target";

    frame.contentWindow.addEventListener("click", (e) => {
      console.log(e.target);
      changeElement(e);
    });
    frame.contentWindow.addEventListener("mouseover", (e) => {
      e.target.style.outline = "#66a2ff solid 2px";
    });
    frame.contentWindow.addEventListener("mouseout", (e) => {
      e.target.style.outline = "1px dotted #2196f3";
    });
  }
};

export default init;
