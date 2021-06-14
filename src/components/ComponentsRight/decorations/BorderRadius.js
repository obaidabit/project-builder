import React, { useState, useContext, useEffect } from "react";
import { ElementContext, ElementContext2 } from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { saveRecord, clearRedoRecord } from "../../../undo";
import savePage from "../../../savePage";

let px;

function BorderRadius() {
  const [selectedTarget] = useContext(ElementContext2);
  const [selectedElement, setSelectedElement] = useContext(ElementContext);
  const [borderTopLeftRadius, setborderTopLeftRadius] = useState("");
  const [borderTopRightRadius, setborderTopRightRadius] = useState("");
  const [borderBottomLeftRadius, setborderBottomLeftRadius] = useState("");
  const [borderBottomRightRadius, setborderBottomRightRadius] = useState("");
  const [px_d1, setPx_d1] = useState("px");
  const [px_d2, setPx_d2] = useState("px");
  const [px_d3, setPx_d3] = useState("px");
  const [px_d4, setPx_d4] = useState("px");

  useEffect(() => {
    setborderTopLeftRadius(check(selectedElement.borderTopLeftRadius));
    setPx_d1(px);
    setborderTopRightRadius(check(selectedElement.borderTopRightRadius));
    setPx_d2(px);
    setborderBottomLeftRadius(check(selectedElement.borderBottomLeftRadius));
    setPx_d3(px);
    setborderBottomRightRadius(check(selectedElement.borderBottomRightRadius));
    setPx_d4(px);
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
      case "borderTopLeftRadius":
        setborderTopLeftRadius(value);
        break;
      case "borderTopRightRadius":
        setborderTopRightRadius(value);
        break;
      case "borderBottomLeftRadius":
        setborderBottomLeftRadius(value);
        break;
      case "borderBottomRightRadius":
        setborderBottomRightRadius(value);
        break;
      case "px_d1":
        setPx_d1(value);
        break;
      case "px_d2":
        setPx_d2(value);
        break;
      case "px_d3":
        setPx_d3(value);
        break;
      case "px_d4":
        setPx_d4(value);
        break;
      default:
        break;
    }
    savePage(false);
  };

  const handleInput = (e) => {
    console.log(e.target.style);
    saveRecord(selectedTarget, "style-change");
    clearRedoRecord();
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    switch (e.target.name) {
      case "borderTopLeftRadius":
        temp[e.target.name] = e.target.value + px_d1;
        break;
      case "borderTopRightRadius":
        temp[e.target.name] = e.target.value + px_d2;
        break;
      case "borderBottomLeftRadius":
        temp[e.target.name] = e.target.value + px_d3;
        break;
      case "borderBottomRightRadius":
        temp[e.target.name] = e.target.value + px_d4;
        break;

      default:
        break;
    }
    setSelectedElement(temp);
    savePage(false);
  };

  const handlePx = (e) => {
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    switch (e.target.name) {
      case "px_d1":
        temp.borderTopLeftRadius = borderTopLeftRadius + e.target.value;
        break;
      case "px_d2":
        temp.borderTopRightRadius = borderTopRightRadius + e.target.value;
        break;
      case "px_d3":
        temp.borderBottomLeftRadius = borderBottomLeftRadius + e.target.value;
        break;
      case "px_d4":
        temp.borderBottomRightRadius = borderBottomRightRadius + e.target.value;
        break;
      default:
        break;
    }
    savePage(false);
  };
  const checkInput = (e) => {
    var ch = String.fromCharCode(e.which);
    if (!/[0-9]/.test(ch)) {
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
    <div className="expand-grid style-group">
      <div className="expand-grid">
        <span className="sub-head">Border Radius</span>
      </div>
      <div>
        <span>TopLeft </span>
        <div className="flex-row shadow">
          <input
            name="borderTopLeftRadius"
            type="text"
            value={borderTopLeftRadius ? borderTopLeftRadius : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
          ></input>
          <select
            name="px_d1"
            value={px_d1 ? px_d1 : updateState("px_d1", "px")}
            onChange={handlePx}
          >
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="vh">vh</option>
          </select>
          <div className="white">
            <button
              id="+BTL"
              name="borderTopLeftRadius"
              value={borderTopLeftRadius ? borderTopLeftRadius : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+BTL">
              <TiArrowSortedUp />
            </label>
            <button
              id="-BTL"
              name="borderTopLeftRadius"
              value={borderTopLeftRadius ? borderTopLeftRadius : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-BTL">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>TopRight </span>
        </div>
        <div className="flex-row shadow">
          <input
            name="borderTopRightRadius"
            type="text"
            value={borderTopRightRadius ? borderTopRightRadius : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
          ></input>
          <select
            name="px_d2"
            value={px_d2 ? px_d2 : updateState("px_d2", "px")}
            onChange={handlePx}
          >
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="vh">vh</option>
          </select>

          <div className="white">
            <button
              id="+BTR"
              name="borderTopRightRadius"
              value={borderTopRightRadius ? borderTopRightRadius : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+BTR">
              <TiArrowSortedUp />
            </label>

            <button
              id="-BTR"
              name="borderTopRightRadius"
              value={borderTopRightRadius ? borderTopRightRadius : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-BTR">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>BottomLeft </span>
        </div>
        <div className="flex-row shadow">
          <input
            name="borderBottomLeftRadius"
            type="text"
            value={borderBottomLeftRadius ? borderBottomLeftRadius : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
          ></input>
          <select
            name="px_d3"
            value={px_d3 ? px_d3 : updateState("px_d3", "px")}
            onChange={handlePx}
          >
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="vh">vh</option>
          </select>

          <div className="white">
            <button
              id="+BBL"
              name="borderBottomLeftRadius"
              value={borderBottomLeftRadius ? borderBottomLeftRadius : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+BBL">
              <TiArrowSortedUp />
            </label>

            <button
              id="-BBL"
              name="borderBottomLeftRadius"
              value={borderBottomLeftRadius ? borderBottomLeftRadius : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-BBL">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>BottomRight </span>
        </div>
        <div className="flex-row shadow">
          <input
            name="borderBottomRightRadius"
            type="text"
            value={borderBottomRightRadius ? borderBottomRightRadius : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
          ></input>
          <select
            name="px_d4"
            value={px_d4 ? px_d4 : updateState("px_d4", "px")}
            onChange={handlePx}
          >
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="vh">vh</option>
          </select>

          <div className="white">
            <button
              id="+BBR"
              name="borderBottomRightRadius"
              value={borderBottomRightRadius ? borderBottomRightRadius : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+BBR">
              <TiArrowSortedUp />
            </label>

            <button
              id="-BBR"
              name="borderBottomRightRadius"
              value={borderBottomRightRadius ? borderBottomRightRadius : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-BBR">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorderRadius;
