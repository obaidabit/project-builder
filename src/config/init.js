import { drag, dragStart, dragOver, drop, dragLeave, dragEnter } from "../drag";

const resize = (target, iframe, event) => {
  if (!target) return;

  const div = document.querySelector(".selected-element");
  const tools = document.querySelector(".tools");
  const tag = document.querySelector(".tag-name");
  const rect = target.getBoundingClientRect();
  const frect = iframe.getBoundingClientRect();

  if (rect.top <= 5) {
    if (rect.height < 20) {
      tools.style.top = rect.height + "px";
      tag.style.top = rect.height + "px";
    } else {
      tools.style.top = 0;
      tag.style.top = 0;
    }
  } else {
    tools.style.top = -22 + "px";
    tag.style.top = -20 + "px";
  }

  if (event === "select") {
    div.style.display = "inline";
  }

  div.style.width = rect.width + "px";
  div.style.height = rect.height + "px";
  div.style.top = frect.top + rect.top + "px";
  div.style.left = frect.left + rect.left + "px";
};

const init = () => {
  const iframe = document.querySelector("iframe");
  const doc = iframe.contentWindow.document;
  let link = document.createElement("link");
  let selectedElement = null;

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
      let right = document.querySelector(".styles");
      right.style.display = "block";
      selectedElement = e.target;
      resize(selectedElement, iframe, "select");
    };

    doc.ondblclick = (e) => {
      e.target.contentEditable = "true";
    };

    iframe.contentWindow.addEventListener("resize", (e) => {
      resize(selectedElement, iframe);
    });
    iframe.contentWindow.addEventListener("scroll", (e) => {
      resize(selectedElement, iframe);
    });
    iframe.contentWindow.addEventListener("mouseover", (e) => {
      e.target.style.outline = "#66a2ff solid 2px";
    });
    iframe.contentWindow.addEventListener("mouseout", (e) => {
      e.target.style.outline = "";
    });
  }
};

export default init;
