import React, { useEffect, useContext, useState } from "react";
import { ElementContext, ElementContext2 } from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { saveRecord, clearRedoRecord } from "../../../undo";
import { resize } from "../../../config/init";
import savePage from "../../../savePage";
let px;

export default function General() {
  const [selectedTarget] = useContext(ElementContext2);
  const [selectedElement, setSelectedElement] = useContext(ElementContext);
  const [display, setDisplay] = useState("");
  const [position, setPosition] = useState("");
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [bottom, setBottom] = useState("");
  const [px1, setPx1] = useState("px");
  const [px2, setPx2] = useState("px");
  const [px3, setPx3] = useState("px");
  const [px4, setPx4] = useState("px");

  useEffect(() => {
    setDisplay(selectedElement.display);
    setPosition(selectedElement.position);
    setTop(check(selectedElement.top));
    setPx1(px);
    setLeft(check(selectedElement.left));
    setPx2(px);
    setRight(check(selectedElement.right));
    setPx3(px);
    setBottom(check(selectedElement.bottom));
    setPx4(px);
  }, [selectedElement]);

  const check = (value) => {
    let num = "";
    px = "";
    if (value === "") {
      savePage(false);
      return;
    } else {
      if (value !== undefined) {
        num = value.indexOf("p");
        if (num === -1) {
          num = value.indexOf("%");
          if (num === -1) {
            num = value.indexOf("v");
          }
        }
        px = value.slice(num);
        value = value.slice(0, num);
        savePage(false);
        return value;
      }
    }
  };

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
      case "px1":
        setPx1(value);
        break;
      case "px2":
        setPx2(value);
        break;
      case "px3":
        setPx3(value);
        break;
      case "px4":
        setPx4(value);
        break;
      default:
        break;
    }
    savePage(false);
  };

  const handleSelect = (e) => {
    saveRecord(selectedTarget, "style-change");
    clearRedoRecord();
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    temp[e.target.name] = e.target.value;
    setSelectedElement(temp);
    resize(selectedTarget, document.querySelector("iframe"), false);
    savePage(false);
  };

  const handleInput = (e) => {
    saveRecord(selectedTarget, "style-change");
    clearRedoRecord();
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    switch (e.target.name) {
      case "top":
        temp[e.target.name] = e.target.value + px1;
        break;
      case "bottom":
        temp[e.target.name] = e.target.value + px2;
        break;
      case "right":
        temp[e.target.name] = e.target.value + px3;
        break;
      case "left":
        temp[e.target.name] = e.target.value + px4;
        break;

      default:
        break;
    }

    setSelectedElement(temp);
    resize(selectedTarget, document.querySelector("iframe"), false);
    savePage(false);
  };

  const handlePx = (e) => {
    saveRecord(selectedTarget, "style-change");
    clearRedoRecord();
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    switch (e.target.name) {
      case "px1":
        temp.top = top + e.target.value;
        break;
      case "px2":
        temp.bottom = bottom + e.target.value;
        break;
      case "px3":
        temp.right = right + e.target.value;
        break;
      case "px4":
        temp.left = left + e.target.value;
        break;
      default:
        break;
    }
    resize(selectedTarget, document.querySelector("iframe"), false);
    savePage(false);
  };

  const checkInput = (e) => {
    var ch = String.fromCharCode(e.which);
    if (!/[0-9-auto]/.test(ch)) {
      e.preventDefault();
    }
  };
  const increase = (e) => {
    var value = e.target.value;
    if (value === "") {
      updateState(e.target.name, "0");
    } else {
      value = parseInt(value) + 1;
      e.target.value = value.toString();
      updateState(e.target.name, e.target.value);
      handleInput(e);
    }
    savePage(false);
  };

  const decrease = (e) => {
    var value = e.target.value;
    if (value === "") {
      updateState(e.target.name, "0");
    } else {
      value = parseInt(value) - 1;
      e.target.value = value.toString();
      updateState(e.target.name, e.target.value);
      handleInput(e);
    }
    savePage(false);
  };

  return (
    <div style={{ display: "none" }} className="style-group">
      <div>
        <div>
          <span>Display</span>
        </div>
        <div className="shadow">
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
      </div>
      <div>
        <div>
          <span>Position </span>
        </div>
        <div>
          <span>
            <select
              className="shadow"
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
          </span>
        </div>
      </div>
      <div>
        <div>
          <span>Top </span>
        </div>
        <div className="flex-row shadow">
          <input
            name="top"
            type="text"
            value={top ? top : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
            placeholder="auto"
          ></input>

          <select name="px1" value={px1 ? px1 : ""} onChange={handlePx}>
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="vh">vh</option>
          </select>

          <div className="white">
            <button
              id="+top"
              name="top"
              value={top ? top : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+top">
              <TiArrowSortedUp />
            </label>

            <button
              id="-top"
              name="top"
              value={top ? top : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-top">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>Bottom </span>
        </div>
        <div className="flex-row shadow">
          <input
            name="bottom"
            type="text"
            value={bottom ? bottom : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
            placeholder="auto"
          ></input>

          <select name="px2" value={px2 ? px2 : ""} onChange={handlePx}>
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="vh">vh</option>
          </select>

          <div className="white">
            <button
              id="+bottom"
              name="bottom"
              value={bottom ? bottom : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+bottom">
              <TiArrowSortedUp />
            </label>

            <button
              id="-bottom"
              name="bottom"
              value={bottom ? bottom : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-bottom">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>Right </span>
        </div>
        <div className="flex-row shadow">
          <input
            name="right"
            type="text"
            value={right ? right : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
            placeholder="auto"
          ></input>

          <select name="px3" value={px3 ? px3 : ""} onChange={handlePx}>
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="vh">vh</option>
          </select>

          <div className="white">
            <button
              id="+right"
              name="right"
              value={right ? right : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+right">
              <TiArrowSortedUp />
            </label>

            <button
              id="-right"
              name="right"
              value={right ? right : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-right">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span>Left </span>
        </div>
        <div className="flex-row shadow">
          <input
            name="left"
            type="text"
            value={left ? left : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
            placeholder="auto"
          ></input>

          <select name="px4" value={px4 ? px4 : ""} onChange={handlePx}>
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="vh">vh</option>
          </select>

          <div className="white">
            <button
              id="+left"
              name="left"
              value={left ? left : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+left">
              <TiArrowSortedUp />
            </label>

            <button
              id="-left"
              name="left"
              value={left ? left : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-left">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
