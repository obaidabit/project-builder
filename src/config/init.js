import { dragStart, dragOver, drop, dragLeave, dragEnter } from "../drag";
import * as resizeEdit from "../resize";

const closeSelectBox = () => {
  const iframe = document.querySelector("iframe");
  const tool = document.querySelector(".selected-element");
  const editable =
    iframe.contentWindow.document.querySelectorAll("[contenteditable]");
  editable.forEach((item) => {
    if (item.contentEditable) item.contentEditable = false;
  });
  tool.style.display = "none";
};
const resize = (target, iframe, event) => {
  if (!target) return;

  const div = document.querySelector(".selected-element");
  const tools = document.querySelector(".tools");
  const tag = document.querySelector(".tag-name");
  const rect = target.getBoundingClientRect();
  const frect = iframe.getBoundingClientRect();

  if (rect.top <= 20) {
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

  if (rect.width < 80) {
    tools.style.left = rect.width + "px";
    tools.style.right = "auto";
    tag.style.top = rect.height + "px";
  } else {
    tools.style.left = "";
    tools.style.right = -4 + "px";
  }
};

const init = () => {
  const iframe = document.querySelector("iframe");
  const doc = iframe.contentWindow.document;
  let script = document.createElement("script");
  let link = document.createElement("link");
  let grid = document.createElement("link");
  let selectedElement = null;

  grid.href = "css/grid.css";
  link.href = "css/style.css"; /**** your CSS file ****/
  grid.rel = link.rel = "stylesheet";
  grid.type = link.type = "text/css";
  script.defer = true;
  script.src = "js/index.js";

  if (iframe) {
    doc.head.appendChild(link);
    doc.head.appendChild(grid);
    doc.head.appendChild(script);
    doc.body.ondrop = drop;
    doc.body.ondragover = dragOver;
    doc.body.ondragenter = dragEnter;
    doc.body.ondragleave = dragLeave;
    doc.body.ondragstart = dragStart;
    doc.body.id = "target";
    doc.body.classList.add("dash-elements");

    doc.onclick = (e) => {
      let right = document.querySelector(".styles");
      right.style.display = "block";
      selectedElement = e.target;
      resize(selectedElement, iframe, "select");

      const textElements = doc.querySelectorAll("[contenteditable]");
      textElements.forEach((item) => {
        if (item === e.target) return;
        item.removeAttribute("contenteditable");
      });
    };

    doc.ondblclick = (e) => {
      e.target.contentEditable = "true";
      e.target.addEventListener("input", () => {
        resize(e.target, iframe, "select");
      });
    };

    iframe.contentWindow.addEventListener("resize", (e) => {
      resize(selectedElement, iframe);
      const panel = document.querySelector("[data-panel]");
      if (panel) resizeEdit.default(panel, selectedElement);
    });
    iframe.contentWindow.addEventListener("scroll", (e) => {
      resize(selectedElement, iframe);
      const panel = document.querySelector("[data-panel]");
      if (panel) resizeEdit.default(panel, selectedElement);
    });
    iframe.contentWindow.addEventListener("mouseover", (e) => {
      e.target.style.outline = "#66a2ff solid 2px";
    });
    iframe.contentWindow.addEventListener("mouseout", (e) => {
      e.target.style.outline = "";
    });
  }
};
export { resize, closeSelectBox };

export default init;
