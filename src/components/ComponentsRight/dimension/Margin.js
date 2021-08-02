import React, { useState, useContext, useEffect } from "react";
import { ElementContext, ElementContext2 } from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { saveRecord, clearRedoRecord } from "../../../undo";
import { resize } from "../../../config/init";
import savePage from "../../../savePage";

let px;

function Margin() {
  const [selectedTarget] = useContext(ElementContext2);
  const [selectedElement, setSelectedElement] = useContext(ElementContext);
  const [marginTop, setmarginTop] = useState("");
  const [marginBottom, setmarginBottom] = useState("");
  const [marginRight, setmarginRight] = useState("");
  const [marginLeft, setmarginLeft] = useState("");
  const [px_m1, setPx_m1] = useState("px");
  const [px_m2, setPx_m2] = useState("px");
  const [px_m3, setPx_m3] = useState("px");
  const [px_m4, setPx_m4] = useState("px");

  useEffect(() => {
    setmarginTop(check(selectedElement.marginTop));
    setPx_m1(px);
    setmarginBottom(check(selectedElement.marginBottom));
    setPx_m2(px);
    setmarginRight(check(selectedElement.marginRight));
    setPx_m3(px);
    setmarginLeft(check(selectedElement.marginLeft));
    setPx_m4(px);
  }, [selectedElement]);

  const check = (value) => {
    let num = "";
    px = "";
    if (value === "") {
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
      case "marginTop":
        setmarginTop(value);
        break;
      case "marginBottom":
        setmarginBottom(value);
        break;
      case "marginRight":
        setmarginRight(value);
        break;
      case "marginLeft":
        setmarginLeft(value);
        break;
      case "px_m1":
        setPx_m1(value);
        break;
      case "px_m2":
        setPx_m2(value);
        break;
      case "px_m3":
        setPx_m3(value);
        break;
      case "px_m4":
        setPx_m4(value);
        break;
      default:
        break;
    }
    savePage(false);
  };

  const handleInput = (e) => {
    saveRecord(selectedTarget, "style-change");
    clearRedoRecord();
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    switch (e.target.name) {
      case "marginTop":
        temp[e.target.name] = e.target.value + px_m1;
        break;
      case "marginBottom":
        temp[e.target.name] = e.target.value + px_m2;
        break;
      case "marginRight":
        temp[e.target.name] = e.target.value + px_m3;
        break;
      case "marginLeft":
        temp[e.target.name] = e.target.value + px_m4;
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
      case "px_m1":
        temp.marginTop = marginTop + e.target.value;
        break;
      case "px_m2":
        temp.marginBottom = marginBottom + e.target.value;
        break;
      case "px_m3":
        temp.marginRight = marginRight + e.target.value;
        break;
      case "px_m4":
        temp.marginLeft = marginLeft + e.target.value;
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
    <div className="expand-grid m-t-2">
      <div>
        <span className="sub-head">Margin</span>
      </div>
      <div className="style-group">
        <div>
          <div>
            <span>Top </span>
          </div>
          <div className="flex-row shadow">
            <input
              name="marginTop"
              type="text"
              value={marginTop ? marginTop : ""}
              onChange={handleInput}
              onKeyPress={checkInput}
            ></input>

            <select name="px_m1" value={px_m1} onChange={handlePx}>
              <option value="px">px</option>
              <option value="%">%</option>
              <option value="vh">vh</option>
            </select>

            <div className="white">
              <button
                id="+Mtop"
                name="marginTop"
                value={marginTop ? marginTop : ""}
                onClick={increase}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="+Mtop">
                <TiArrowSortedUp />
              </label>

              <button
                id="-Mtop"
                name="marginTop"
                value={marginTop ? marginTop : ""}
                onClick={decrease}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="-Mtop">
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
              name="marginBottom"
              type="text"
              value={marginBottom ? marginBottom : ""}
              onChange={handleInput}
              onKeyPress={checkInput}
            ></input>

            <select name="px_m2" value={px_m2} onChange={handlePx}>
              <option value="px">px</option>
              <option value="%">%</option>
              <option value="vh">vh</option>
            </select>

            <div className="white">
              <button
                id="+MBottom"
                name="marginBottom"
                value={marginBottom ? marginBottom : ""}
                onClick={increase}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="+MBottom">
                <TiArrowSortedUp />
              </label>

              <button
                id="-MBottom"
                name="marginBottom"
                value={marginBottom ? marginBottom : ""}
                onClick={decrease}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="-MBottom">
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
              name="marginRight"
              type="text"
              value={marginRight ? marginRight : ""}
              onChange={handleInput}
              onKeyPress={checkInput}
            ></input>

            <select name="px_m3" value={px_m3} onChange={handlePx}>
              <option value="px">px</option>
              <option value="%">%</option>
              <option value="vh">vh</option>
            </select>

            <div className="white">
              <button
                id="+MRight"
                name="marginRight"
                value={marginRight ? marginRight : ""}
                onClick={increase}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="+MRight">
                <TiArrowSortedUp />
              </label>

              <button
                id="-MRight"
                name="marginRight"
                value={marginRight ? marginRight : ""}
                onClick={decrease}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="-MRight">
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
              name="marginLeft"
              type="text"
              value={marginLeft ? marginLeft : ""}
              onChange={handleInput}
              onKeyPress={checkInput}
            ></input>

            <select name="px_m4" value={px_m4} onChange={handlePx}>
              <option value="px">px</option>
              <option value="%">%</option>
              <option value="vh">vh</option>
            </select>

            <div className="white">
              <button
                id="+MLeft"
                name="marginLeft"
                value={marginLeft ? marginLeft : ""}
                onClick={increase}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="+MLeft">
                <TiArrowSortedUp />
              </label>

              <button
                id="-MLeft"
                name="marginLeft"
                value={marginLeft ? marginLeft : ""}
                onClick={decrease}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="-MLeft">
                <TiArrowSortedDown />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Margin;
