import React, { useEffect, useContext, useState } from "react";
import { ElementContext, ElementContext2 } from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import {
  FiAlignLeft,
  FiAlignRight,
  FiAlignCenter,
  FiAlignJustify,
  FiUnderline,
} from "react-icons/fi";
import { GrStrikeThrough } from "react-icons/gr";
import { RiCloseLine } from "react-icons/ri";
import { saveRecord, clearRedoRecord } from "../../../undo";
import TextShadow from "./TextShadow";
import savePage from "../../../savePage";
let px;

function Typography() {
  const [selectedTarget] = useContext(ElementContext2);
  //this variable is used for undo and redo functions
  const [selectedElement, setSelectedElement] = useContext(ElementContext);
  const [fontFamily, setfontFamily] = useState("");
  const [fontSize, setfontSize] = useState("");
  const [fontWeight, setfontWeight] = useState("");
  const [letterSpacing, setletterSpacing] = useState("");
  const [color, setColor] = useState("#rrggbb");
  const [lineHeight, setlineHeight] = useState("");
  const [radioValue, setradioValue] = useState("");
  const [radioValue2, setradioValue2] = useState("");

  const [px1, setPx1] = useState("px");
  const [px2, setPx2] = useState("px");
  const [px3, setPx3] = useState("px");

  useEffect(() => {
    setfontFamily(selectedElement.fontFamily);
    setfontSize(check(selectedElement.fontSize));
    setPx1(px);
    setfontWeight(selectedElement.fontWeight);
    setletterSpacing(check(selectedElement.letterSpacing));
    setPx2(px);
    setColor(checkColor(selectedElement.color));
    setlineHeight(check(selectedElement.lineHeight));
    setPx3(px);
    setradioValue(selectedElement.textAlign);
    setradioValue2(selectedElement.textDecoration);
  }, [selectedElement]);

  const checkColor = (value) => {
    if (value !== "") {
      if (value !== undefined) {
        //red
        var r = parseInt(
          value.slice(value.indexOf("(") + 1, value.indexOf(","))
        );
        r = r.toString(16);
        r = r.length === 1 ? "0" + r : r;
        //green
        value = value.slice(value.indexOf(",") + 1);
        var g = parseInt(value.slice(0, value.indexOf(",")));
        g = g.toString(16);
        g = g.length === 1 ? "0" + g : g;
        //blue
        value = value.slice(value.indexOf(",") + 1);
        var b = parseInt(value.slice(0, value.indexOf(",")));
        b = b.toString(16);
        b = b.length === 1 ? "0" + b : b;
        savePage(false);
        return "#" + r + g + b;
      }
    } else {
      savePage(false);
      return "#000000";
    }
  };

  const check = (value) => {
    let num = "";
    px = "";
    if (value === "") {
      return;
    } else {
      if (value !== undefined) {
        num = value.indexOf("p");
        if (num === -1) {
          num = value.indexOf("e");
          if (num === -1) {
            num = value.indexOf("r");
            if (num === -1) {
              num = value.indexOf("%");
            }
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
      case "fontFamily":
        setfontFamily(value);
        break;
      case "fontSize":
        setfontSize(value);
        break;
      case "fontWeight":
        setfontWeight(value);
        break;
      case "letterSpacing":
        setletterSpacing(value);
        break;
      case "color":
        setColor(value);
        break;
      case "lineHeight":
        setlineHeight(value);
        break;
      case "textAlign":
        setradioValue(value);
        break;
      case "textDecoration":
        setradioValue2(value);
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
    savePage(false);
  };

  const handleInput = (e) => {
    saveRecord(selectedTarget, "style-change");
    clearRedoRecord();
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    switch (e.target.name) {
      case "fontSize":
        temp[e.target.name] = e.target.value + px1;
        break;
      case "letterSpacing":
        temp[e.target.name] = e.target.value + px2;
        break;
      case "lineHeight":
        temp[e.target.name] = e.target.value + px3;
        break;
      case "textAlign":
        temp.textAlign = e.target.value;
        break;
      case "textDecoration":
        temp.textDecoration = e.target.value;
        break;

      default:
        break;
    }
    setSelectedElement(temp);
    savePage(false);
  };

  const handlePx = (e) => {
    saveRecord(selectedTarget, "style-change");
    clearRedoRecord();
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    switch (e.target.name) {
      case "px1":
        temp.fontSize = fontSize + e.target.value;
        break;
      case "px2":
        temp.letterSpacing = letterSpacing + e.target.value;
        break;
      case "px3":
        temp.lineHeight = lineHeight + e.target.value;
        break;
      default:
        break;
    }
    savePage(false);
  };
  const checkInput = (e) => {
    var ch = String.fromCharCode(e.which);
    if (e.target.name !== "color") {
      if (!/[0-9]/.test(ch)) {
        e.preventDefault();
      }
    } else {
      if (!/[0-9-#]/.test(ch)) {
        e.preventDefault();
      }
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
        <span>Font</span>

        <div>
          <select
            className="shadow"
            name="fontFamily"
            value={fontFamily ? fontFamily : ""}
            onChange={handleSelect}
          >
            <option value=""></option>
            <option value="Arial">Arial</option>
            <option value="Arial Black">Arial Black</option>
            <option value="Brush Script MT">Brush Script MT</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Imapact">Imapact</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>
      </div>

      <div>
        <div>
          <span>Font size </span>
        </div>
        <div>
          <div className="flex-row shadow">
            <input
              name="fontSize"
              type="text"
              value={fontSize ? fontSize : ""}
              onChange={handleInput}
              onKeyPress={checkInput}
              placeholder="medium"
            ></input>

            <select name="px1" value={px1 ? px1 : ""} onChange={handlePx}>
              <option value="px">px</option>
              <option value="em">em</option>
              <option value="rem">rem</option>
              <option value="%">%</option>
            </select>

            <div className="white">
              <button
                id="+FontSize"
                name="fontSize"
                value={fontSize ? fontSize : ""}
                onClick={increase}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="+FontSize">
                <TiArrowSortedUp />
              </label>

              <button
                id="-FontSize"
                name="fontSize"
                value={fontSize ? fontSize : ""}
                onClick={decrease}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="-FontSize">
                <TiArrowSortedDown />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span>Weight</span>
        </div>
        <div className="shadow">
          <select
            name="fontWeight"
            value={fontWeight ? fontWeight : ""}
            onChange={handleSelect}
          >
            <option value=""></option>
            <option value="100">Thin</option>
            <option value="200">Extra-Light</option>
            <option value="300">Light</option>
            <option value="400">Normal</option>
            <option value="500">Medium</option>
            <option value="600">Semi-Bold</option>
            <option value="700">Bold</option>
            <option value="800">Extra-Bold</option>
            <option value="900">Ultra-Bold</option>
          </select>
        </div>
      </div>

      <div>
        <div>
          <span>Letter Spacing </span>
        </div>
        <div>
          <div className="flex-row shadow">
            <input
              name="letterSpacing"
              type="text"
              value={letterSpacing ? letterSpacing : ""}
              onChange={handleInput}
              onKeyPress={checkInput}
              placeholder="normal"
            ></input>

            <select name="px2" value={px2 ? px2 : ""} onChange={handlePx}>
              <option value="px">px</option>
              <option value="em">em</option>
              <option value="rem">rem</option>
              <option value="%">%</option>
            </select>

            <div className="white">
              <button
                id="+letterSpacing"
                name="letterSpacing"
                value={letterSpacing ? letterSpacing : ""}
                onClick={increase}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="+letterSpacing">
                <TiArrowSortedUp />
              </label>

              <button
                id="-letterSpacing"
                name="letterSpacing"
                value={letterSpacing ? letterSpacing : ""}
                onClick={decrease}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="-letterSpacing">
                <TiArrowSortedDown />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span>Font Color </span>
        </div>
        <div className="flex-row">
          <input
            className="shadow flex-grow"
            name="color"
            type="text"
            value={color ? color : ""}
            onChange={handleSelect}
            onKeyPress={checkInput}
          ></input>
          <input
            className="flex-shrink"
            name="color"
            type="color"
            value={color ? color : ""}
            onChange={handleSelect}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <span>Line Height </span>
        </div>
        <div className="flex-row shadow">
          <input
            name="lineHeight"
            type="text"
            value={lineHeight ? lineHeight : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
            placeholder="normal"
          ></input>

          <select name="px3" value={px3 ? px3 : ""} onChange={handlePx}>
            <option value="px">px</option>
            <option value="em">em</option>
            <option value="rem">rem</option>
            <option value="%">%</option>
          </select>

          <div className="white">
            <button
              id="+lineHeight"
              name="lineHeight"
              value={lineHeight ? lineHeight : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+lineHeight">
              <TiArrowSortedUp />
            </label>

            <button
              id="-lineHeight"
              name="lineHeight"
              value={lineHeight ? lineHeight : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-lineHeight">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span>Text Align </span>
        </div>
        <div className="text-align shadow">
          <div>
            <input
              id="r1"
              type="radio"
              name="textAlign"
              value="left"
              checked={radioValue === "left"}
              onChange={handleInput}
              style={{ display: "none" }}
            />
            <label htmlFor="r1" className="text-align-label">
              <FiAlignLeft />
            </label>
          </div>

          <div>
            <input
              id="r3"
              type="radio"
              name="textAlign"
              value="center"
              checked={radioValue === "center"}
              onChange={handleInput}
              style={{ display: "none" }}
            />
            <label htmlFor="r3" className="text-align-label">
              <FiAlignCenter />
            </label>
          </div>
          <div>
            <input
              id="r2"
              type="radio"
              name="textAlign"
              value="right"
              checked={radioValue === "right"}
              onChange={handleInput}
              style={{ display: "none" }}
            />
            <label htmlFor="r2" className="text-align-label">
              <FiAlignRight />
            </label>
          </div>
          <div>
            <input
              id="r4"
              type="radio"
              name="textAlign"
              value="justify"
              checked={radioValue === "justify"}
              onChange={handleInput}
              style={{ display: "none" }}
            />
            <label htmlFor="r4" className="text-align-label">
              <FiAlignJustify />
            </label>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span>Text Decoration </span>
        </div>
        <div className="text-align shadow">
          <div>
            <input
              id="r5"
              type="radio"
              name="textDecoration"
              value="none"
              checked={radioValue2 === "none"}
              onChange={handleInput}
              style={{ display: "none" }}
            />
            <label htmlFor="r5" className="text-align-label">
              <RiCloseLine />
            </label>
          </div>
          <div>
            <input
              id="r6"
              type="radio"
              name="textDecoration"
              value="underline"
              checked={radioValue2 === "underline"}
              onChange={handleInput}
              style={{ display: "none" }}
            />
            <label htmlFor="r6" className="text-align-label">
              <FiUnderline />
            </label>
          </div>
          <div>
            <input
              id="r7"
              type="radio"
              name="textDecoration"
              value="line-through"
              checked={radioValue2 === "line-through"}
              onChange={handleInput}
              style={{ display: "none" }}
            />
            <label htmlFor="r7" className="text-align-label">
              <GrStrikeThrough />
            </label>
          </div>
        </div>
      </div>
      <TextShadow />
    </div>
  );
}

export default Typography;
