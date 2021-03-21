import React, { useEffect, useContext, useState } from "react";
import { ElementContext } from "./ElementContext";

export default function General() {
  const [selectedElement, setSelectedElement] = useContext(ElementContext);
  const [display, setDisplay] = useState("");
  const [position, setPosition] = useState("");
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [bottom, setBottom] = useState("");

  useEffect(() => {
    setDisplay(selectedElement.display);
    setPosition(selectedElement.position);
    setTop(selectedElement.top);
    setLeft(selectedElement.left);
    setRight(selectedElement.right);
    setBottom(selectedElement.bottom);
  }, [selectedElement]);

  const updateState = (name, value) => {
    switch (name) {
      case "display":
        setDisplay(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "top":
        setTop(value);
        break;
      case "bottom":
        setBottom(value);
        break;
      case "left":
        setLeft(value);
        break;
      case "right":
        setRight(value);
        break;
      default:
        break;
    }
  };

  const handleSelect = (e) => {
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    temp[e.target.name] = e.target.value;
    setSelectedElement(temp);
  };

  const handleInput = (e) => {
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    temp[e.target.name] = e.target.value;
    setSelectedElement(temp);
  };

  return (
    <div style={{ display: "none" }} className="style-group">
      <div>
        <span>Display</span>
        <select
          name="display"
          value={display ? display : ""}
          onChange={handleSelect}
        >
          <option value=""></option>
          <option value="block">block</option>
          <option value="inline">inline</option>
          <option value="inline-block">inline-block</option>
          <option value="flex">flex</option>
          <option value="none">none</option>
        </select>
      </div>
      <div>
        <span>Position </span>
        <select
          name="position"
          value={position ? position : ""}
          onChange={handleSelect}
        >
          <option value=""></option>
          <option value="static">static</option>
          <option value="relative">relative</option>
          <option value="absolute">absolute</option>
          <option value="fixed">fixed</option>
        </select>
      </div>
      <div>
        <span>Top </span>
        <input
          name="top"
          type="number"
          value={top ? top : ""}
          onChange={handleInput}
        ></input>
      </div>
      <div>
        <span>Bottom </span>
        <input
          name="bottom"
          type="number"
          value={bottom ? bottom : ""}
          onChange={handleInput}
        ></input>
      </div>
      <div>
        <span>Right </span>
        <input
          name="right"
          type="number"
          value={right ? right : ""}
          onChange={handleInput}
        ></input>
      </div>
      <div>
        <span>Left </span>
        <input
          name="left"
          type="number"
          value={left ? left : ""}
          onChange={handleInput}
        ></input>
      </div>
    </div>
  );
}
