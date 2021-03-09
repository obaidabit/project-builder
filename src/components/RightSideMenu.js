import React, { useState } from "react";
import { element } from "./changeStyle";

export default function RightSideMenu(props) {
  const [display, setDisplay] = useState("");
  const [position, setPosition] = useState("");
  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [right, setRight] = useState("");
  const [left, setLeft] = useState("");

  function show(e) {
    if (e.target.nextElementSibling.style.display === "none")
      e.target.nextElementSibling.style.display = "block";
    else e.target.nextElementSibling.style.display = "none";
  }

  function handleDisplay(e) {
    if (element.style.display === "") {
      element.style.display = e.target.value;
    } else {
      element.style.display = e.target.value;
    }
    setDisplay(element.style.display);
    console.log(element.style.display);
  }

  function handlePoistion(e) {
    if (element.style.position === "") {
      element.style.position = e.target.value;
    } else {
      element.style.position = e.target.value;
    }
    setPosition(e.target.value);

    console.log(element.style.position);
  }
  function handleTop(e) {
    if (element.style.top === "") {
      element.style.top = e.target.value + "px";
    } else {
      element.style.top = e.target.value + "px";
    }
    setTop(e.target.value);
    console.log(element.style.top);
  }
  function handleBottom(e) {
    if (element.style.bottom === "") {
      element.style.bottom = e.target.value + "px";
    } else {
      element.style.bottom = e.target.value + "px";
    }
    setBottom(e.target.value);
    console.log(element.style.bottom);
  }
  function handleRight(e) {
    if (element.style.right === "") {
      element.style.right = e.target.value + "px";
    } else {
      element.style.right = e.target.value + "px";
    }
    setRight(e.target.value);
    console.log(element.style.right);
  }
  function handleLeft(e) {
    if (element.style.left === "") {
      element.style.left = e.target.value + "px";
    } else {
      element.style.left = e.target.value + "px";
    }
    setLeft(e.target.value);
    console.log(element.style.left);
  }

  return (
    <div className="right-side-menu">
      <h3>Right Menu </h3>
      <div className="elements" style={{ display: "none" }}>
        <div onClick={show}>General</div>
        <div style={{ display: "none" }}>
          <div>
            <span>Display </span>
            <select value={display} onChange={handleDisplay}>
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
            <select value={position} onChange={handlePoistion}>
              <option value=""></option>
              <option value="static">static</option>
              <option value="relative">relative</option>
              <option value="absolute">absolute</option>
              <option value="fixed">fixed</option>
            </select>
          </div>
          <div>
            <span>top </span>
            <input type="number" value={top} onChange={handleTop}></input>
          </div>
          <div>
            <span>bottom </span>
            <input type="number" value={bottom} onChange={handleBottom}></input>
          </div>
          <div>
            <span>right </span>
            <input type="number" value={right} onChange={handleRight}></input>
          </div>
          <div>
            <span>left </span>
            <input type="number" value={left} onChange={handleLeft}></input>
          </div>
        </div>
      </div>
    </div>
  );
}
