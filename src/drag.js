let tempElement = null;
let inIframe = false;
let oldBackground = "";
const mousePosition = {
  x: 0,
  y: 0,
};

const dropPosition = (targetNode) => {
  const targetRec = targetNode.getBoundingClientRect();
  let position = "";

  if (
    targetNode === document.querySelector("iframe").contentWindow.document.body
  )
    return "add";

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
      break;
    default:
      break;
  }
  tag.style.border = "1px dotted #2196f3";
  tag.style.padding = "1rem";
  tag.draggable = true;
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
  if (e.target === tempElement) {
    e.target.style.background = oldBackground;
    return;
  }
  if (inIframe) {
    clone = tempElement;
    switch (dropPosition(e.target)) {
      case "before":
        e.target.parentNode.insertBefore(tempElement, e.target);
        break;
      case "after":
        e.target.parentNode.insertBefore(tempElement, e.target.nextSibling);
        break;
      default:
        e.target.appendChild(clone);
        break;
    }
  } else {
    clone = tempElement.cloneNode(true);
    e.target.appendChild(clone);
  }
  clone.onclick = (e) => {
    let right = document.getElementsByClassName("elements");
    right[1].style.display = "block";
  };
  clone.ondblclick = (e) => {
    e.target.contentEditable = "true";
  };

  e.target.style.background = oldBackground;
  e.target.style.border = "1px dotted #2196f3";
};

const dragOver = (e) => {
  e.preventDefault();
};

const drag = (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
};

export { drag, dragStart, dragOver, drop, dragLeave, dragEnter };
