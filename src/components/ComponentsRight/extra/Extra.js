import React, { useEffect, useContext, useState } from "react";
import Transform from "./Transform";
import { ElementContext } from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
let px;

function Extra() {
  const [selectedElement, setSelectedElement] = useContext(ElementContext);
  const [perspective, setperspective] = useState("");
  const [px1, setPx1] = useState("px");

  useEffect(() => {
    setperspective(check(selectedElement.perspective));
    setPx1(px);
  }, [selectedElement]);

  const check = (value) => {
    let num = "";
    px = "";
    if (value === "") {
      return;
    } else {
      if (value !== undefined) {
        num = value.indexOf("p");
        px = value.slice(num);
        value = value.slice(0, num);
        return value;
      }
    }
  };

  const updateState = (name, value) => {
    switch (name) {
      case "perspective":
        setperspective(value);
        break;
      case "px1":
        setPx1(value);
        break;
      default:
        break;
    }
  };

  const handleInput = (e) => {
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    switch (e.target.name) {
      case "perspective":
        temp[e.target.name] = e.target.value + px1;
        break;
      default:
        break;
    }

    setSelectedElement(temp);
  };

  const handlePx = (e) => {
    updateState(e.target.name, e.target.value);
    const temp = selectedElement;
    switch (e.target.name) {
      case "px1":
        temp.perspective = perspective + e.target.value;
        break;
      default:
        break;
    }
  };

  const checkInput = (e) => {
    var ch = String.fromCharCode(e.which);
    console.log(e.which);
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
  };

  const decrease = (e) => {
    var value = e.target.value;
    if (value === "") {
      updateState(e.target.name, "0");
    } else {
      if (value > 0) {
        value = parseInt(value) - 1;
        e.target.value = value.toString();
        updateState(e.target.name, e.target.value);
        handleInput(e);
      }
    }
  };

  return (
    <div style={{ display: "none" }} className="style-group">
      <div className="expand-grid">
        <span>Perspective </span>

        <div className="flex-row shadow">
          <input
            name="perspective"
            type="text"
            value={perspective ? perspective : ""}
            onChange={handleInput}
            onKeyPress={checkInput}
          ></input>
          <select
            name="px1"
            value={px1 ? px1 : updateState("px1", "px")}
            onChange={handlePx}
          >
            <option value="px">px</option>
          </select>

          <div className="white">
            <button
              id="+perspective"
              name="perspective"
              value={perspective ? perspective : ""}
              onClick={increase}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="+perspective">
              <TiArrowSortedUp />
            </label>

            <button
              id="-perspective"
              name="perspective"
              value={perspective ? perspective : ""}
              onClick={decrease}
              style={{ display: "none" }}
            />
            <label className="icon-label" htmlFor="-perspective">
              <TiArrowSortedDown />
            </label>
          </div>
        </div>
      </div>
      <Transform />
    </div>
  );
}

export default Extra;
