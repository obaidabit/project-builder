import { drag, dragStart, dragOver, drop, dragLeave, dragEnter } from "../drag";

const init = () => {
  const iframe = document.querySelector("iframe");
  const doc = iframe.contentWindow.document;
  let link = document.createElement("link");

  link.href = "elements-style.css"; /**** your CSS file ****/
  link.rel = "stylesheet";
  link.type = "text/css";

  if (iframe) {
    doc.head.appendChild(link);
    doc.body.ondrag = drag;
    doc.body.ondrop = drop;
    doc.body.ondragover = dragOver;
    doc.body.ondragenter = dragEnter;
    doc.body.ondragleave = dragLeave;
    doc.body.ondragstart = dragStart;
    doc.body.id = "target";

    doc.onclick = (e) => {
      const div = document.querySelector(".selected-element");
      const rect = e.target.getBoundingClientRect();
      const frect = iframe.getBoundingClientRect();
      div.style.display = "inline";
      div.style.width = rect.width + "px";
      div.style.height = rect.height + "px";
      div.style.top = frect.top + rect.top + "px";
      div.style.left = frect.left + rect.left + "px";
    };

    iframe.contentWindow.addEventListener("mouseover", (e) => {
      e.target.style.outline = "#66a2ff solid 2px";
    });
    iframe.contentWindow.addEventListener("mouseout", (e) => {
      e.target.style.outline = "";
    });
  }
};

export default init;
