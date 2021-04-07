import savePage from "./savePage";

let tempElement = null;
let inIframe = false;
let oldBackground = "";
const mousePosition = {
  x: 0,
  y: 0,
};

const dropPosition = (targetNode) => {
  const targetRec = targetNode.getBoundingClientRect();

  if (
    targetNode === document.querySelector("iframe").contentWindow.document.body
  )
    return "add";

  let position = "";
  if (targetRec.top + targetRec.height / 3 > mousePosition.y) {
    position = "before";
  } else if (
    targetRec.top + targetRec.height / 3 < mousePosition.y &&
    targetRec.top + targetRec.height - targetRec.height / 3 < mousePosition.y
  ) {
    position = "after";
  } else {
    position = "add";
  }

  return position;
};

const SelectTag = (element) => {
  let tag = null;
  switch (element.id) {
    case "section":
      tag = document.createElement("section");
      tag.innerHTML = "Section";
      break;
    case "navbar":
      tag = document.createElement("nav");
      tag.innerHTML = "Navbar";
      break;
    case "link":
      tag = document.createElement("a");
      tag.innerHTML = "Link";
      tag.href = "#";
      break;
    case "button":
      tag = document.createElement("button");
      tag.innerHTML = "Button";
      tag.className = "light-button";
      break;
    case "radio-button":
      tag = document.createElement("label");
      let spn = document.createElement("dev");
      let radio = document.createElement("input");
      spn.className = "radio-radio";
      radio.type = "radio";
      radio.className = "radio-input";
      tag.innerHTML = "This is Radio Button";
      tag.className = "radio";
      tag.appendChild(radio);
      tag.appendChild(spn);
      break;
    case "input-text":
      tag = document.createElement("input");
      tag.innerHTML = "input";
      tag.type = "text";
      // tag.className = "light-button";
      break;
    case "image":
      tag = document.createElement("img");
      tag.src = "./img/adult-beanie-crisis-220365.jpg";
      tag.className = "image";
      break;
    case "video":
      tag = document.createElement("video");
      tag.setAttribute("controls", "");
      tag.className = "video";
      let source = document.createElement("source");
      source.src =
        "./img/AHHHHHHHHHH (Alternate Extended) (Big Enough) [HD] (online-video-cutter.com).mp4";
      source.type = "video/mp4";
      tag.appendChild(source);
      break;
    default:
      break;
  }
  tag.draggable = "true";
  return tag;
};

const dragStart = (e) => {
  if (e.target.ownerDocument.querySelector("body").id === "target") {
    inIframe = true;
    tempElement = e.target;
  } else {
    inIframe = false;
    tempElement = SelectTag(e.target);
  }
};

const dragEnter = (e) => {
  oldBackground = e.target.style.background;
  e.target.style.background = "#afc7ff";
};

const dragLeave = (e) => {
  e.target.style.background = oldBackground;
};

const drop = (e) => {
  e.preventDefault();

  let clone = null;
  let dropParent = null;

  if (e.target === tempElement) {
    e.target.style.background = oldBackground;
    return;
  }

  if (inIframe) {
    clone = tempElement;
    switch (dropPosition(e.target)) {
      case "before":
        e.target.parentNode.insertBefore(tempElement, e.target);
        dropParent = e.target.parentNode;
        break;
      case "after":
        e.target.parentNode.insertBefore(tempElement, e.target.nextSibling);
        dropParent = e.target.parentNode;
        break;
      default:
        e.target.appendChild(clone);
        dropParent = e.target;
        break;
    }
  } else {
    clone = tempElement;
    clone.id = Math.random().toString(36).substr(2, 5);
    e.target.appendChild(clone);
    dropParent = e.target;
  }

  e.target.style.background = oldBackground;
  e.target.style.outline = "1px dotted #2196f3";
  savePage(false);
};

const dragOver = (e) => {
  e.preventDefault();
};

const drag = (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
};

export { drag, dragStart, dragOver, drop, dragLeave, dragEnter };
