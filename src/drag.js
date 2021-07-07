import savePage from "./savePage";
import Test from "./components/elements/Test";
import Button from "./components/elements/Button";
import Image from "./components/elements/Image";
import Input from "./components/elements/Input";
import Link from "./components/elements/Link";
import Nav from "./components/elements/Nav";
import RadioButton from "./components/elements/RadioButton";
import Section from "./components/elements/Section";
import Video from "./components/elements/Video";
import ReactDOMServer from "react-dom/server";
import Container from "./components/elements/Container";
import { saveRecord, clearRedoRecord } from "./undo";
import Two from "./components/elements/Two";
import Three from "./components/elements/Three";
import List from "./components/elements/List";
import ListItem from "./components/elements/ListItem";
import Form from "./components/elements/Form";
import CheckBox from "./components/elements/CheckBox";
import Label from "./components/elements/Label";
import TextArea from "./components/elements/TextArea";
import Select from "./components/elements/Select";
import FormButton from "./components/elements/FormButton";
import Columns from "./components/elements/Columns";
import Text from "./components/elements/Text";
import { resize as resizeSelectBox } from "./config/init";
import resize from "./resize";
import SlideShow from "./components/elements/SlideShow";
import Tabs from "./components/elements/Tabs";
import FullScreenVideo from "./components/elements/FullScreenVideo";
import Hero from "./components/elements/Hero";

import ShoesLayout from "./components/Layouts/ShoesLayout";

let hr = null;  
let tempElement = null;
let inIframe = false;

const mousePosition = {
  x: 0,
  y: 0,
};

function randomID(node) {
  if (!node.id) node.id = Math.random().toString(36).substr(2, 5);
  if (node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      randomID(node.children[i]);
    }
  }
}

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
  console.log(position);
  return position;
};

const SelectTag = (element) => {
  let tag = null;
  switch (element.id) {
    case "section":
      tag = <Section />;
      break;
    case "navbar":
      tag = <Nav />;
      break;
    case "link":
      tag = <Link />;
      break;
    case "button":
      tag = <Button />;
      break;
    case "radio-button":
      tag = <RadioButton />;
      break;
    case "input-text":
      tag = <Input />;
      break;
    case "image":
      tag = <Image />;
      break;
    case "video":
      tag = <Video />;
      break;
    case "container":
      tag = <Container />;
      break;
    case "2column":
      tag = <Two />;
      break;
    case "3column":
      tag = <Three />;
      break;
    case "list":
      tag = <List />;
      break;
    case "listitem":
      tag = <ListItem />;
      break;
    case "form-block":
      tag = <Form />;
      break;
    case "label":
      tag = <Label />;
      break;
    case "checkbox":
      tag = <CheckBox />;
      break;
    case "textarea":
      tag = <TextArea />;
      break;
    case "select":
      tag = <Select />;
      break;
    case "form-button":
      tag = <FormButton />;
      break;
    case "columns":
      tag = <Columns />;
      break;
    case "text":
      tag = <Text />;
      break;
    case "slideshow":
      tag = <SlideShow />;
      break;
    case "tabs":
      tag = <Tabs />;
      break;
    case "fullscreen":
      tag = <FullScreenVideo />;
      break;
    case "hero":
      tag = <Hero />;
      break;
    case "ShoesLayout":
      tag = <ShoesLayout />;
      break;
    default:
      tag = <Test />;
      break;
  }

  const htmlString = ReactDOMServer.renderToStaticMarkup(tag);
  const el = new DOMParser().parseFromString(htmlString, "text/html");
  tag = el.body.firstChild;

  tag.draggable = "true";
  return tag;
};

const dragStart = (e) => {
  if (e.target.ownerDocument.querySelector("body").id === "target") {
    inIframe = true;
    tempElement = e.target;
    saveRecord(tempElement, "move");
    clearRedoRecord();
  } else {
    inIframe = false;
    tempElement = SelectTag(e.target);
  }
  hr = document.querySelector("hr");
};

const dragEnter = (e) => {
  if (e.target !== tempElement) {
    e.target.classList.add("hover");
  }
};

const dragLeave = (e) => {
  if (e.target !== tempElement) {
    e.target.classList.remove("hover");
  }
};

const drop = (e) => {
  e.preventDefault();
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;

  let clone = null;

  if (e.target === tempElement) {
    e.target.classList.remove("hover");
    return;
  }

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

  const iframe = document.querySelector("iframe");
  const panel = document.querySelector("[data-panel]");

  if (!inIframe) {
    randomID(clone);
    saveRecord(tempElement, "added");
    clearRedoRecord();
    resizeSelectBox(e.target, iframe, null);
    resize(panel, e.target);
  } else {
    const oldSelected =
      iframe.contentWindow.document.querySelector("[data-selected]");
    if (oldSelected) {
      resizeSelectBox(oldSelected, iframe, null);
      resize(panel, oldSelected);
    }
  }
  hr.style.display = "none";
  e.target.classList.remove("hover");
  e.target.style.outline = "1px dotted #2196f3";
  savePage(false);
  iframe.contentWindow.main();
};

const dragOver = (e) => {
  e.preventDefault();
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
  const dim = e.target.getBoundingClientRect();
  if (tempElement !== e.target)
    switch (dropPosition(e.target)) {
      case "before": {
        hr.style.display = "inline";
        hr.style.width = dim.width + "px";
        hr.style.top = dim.top + 44 + "px";
        hr.style.left = dim.left + 265 + "px";
        break;
      }
      case "after": {
        hr.style.display = "inline";
        hr.style.width = dim.width + "px";
        hr.style.top = dim.height + dim.top + 47 + "px";
        hr.style.left = dim.left + 265 + "px";
        break;
      }
      default:
        hr.style.display = "none";
        break;
    }
};

export { dragStart, dragOver, drop, dragLeave, dragEnter };
