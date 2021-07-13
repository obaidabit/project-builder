import React, { useState, useContext, useEffect } from "react";
import { ElementContext } from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import savePage from "../../../savePage";
let r, g, b, x, y, blur;

function TextShadow() {
  const [selectedElement, setSelectedElement] = useContext(ElementContext);
  const [Xposition, setXposition] = useState("");
  const [Yposition, setYposition] = useState("");
  const [Blur, setBlur] = useState("");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    checkColor(selectedElement.textShadow);
    setXposition(x);
    setYposition(y);
    setBlur(blur);
  }, [selectedElement]);

  const checkColor = (value) => {
    r = "";
    g = "";
    b = "";
    x = "";
    y = "";
    blur = "";
    if (value !== "") {
      if (value !== undefined) {
        //red
        r = parseInt(value.slice(value.indexOf("(") + 1, value.indexOf(",")));
        r = r.toString(16);
        r = r.length === 1 ? "0" + r : r;
        //green
        value = value.slice(value.indexOf(",") + 1);
        g = parseInt(value.slice(0, value.indexOf(",")));
        g = g.toString(16);
        g = g.length === 1 ? "0" + g : g;
        //blue
        value = value.slice(value.indexOf(",") + 1);
        b = parseInt(value.slice(0, value.indexOf(",")));
        b = b.toString(16);
        b = b.length === 1 ? "0" + b : b;
        //Xposition
        x = value.slice(4, value.indexOf("p"));
        value = value.slice(value.indexOf("x"));
        //Yposition
        y = value.slice(2, value.indexOf("p"));
        value = value.slice(value.indexOf("p"));
        //Blur
        value = value.slice(3);
        blur = value.slice(0, value.indexOf("p"));
        savePage(false);
      }
    } else {
      return "#000000";
    }
  };

  const updateState = (name, value) => {
    switch (name) {
      case "Xposition":
        setXposition(value);
        break;
      case "Yposition":
        setYposition(value);
        break;
      case "Blur":
        setBlur(value);
        break;
      case "color":
        setColor(value);
        break;
      default:
        break;
    }
    savePage(false);
  };

  const handleInput = (e) => {
    updateState(e.target.name, e.target.value);
    const value = e.target.value;
    const temp = selectedElement;
    switch (e.target.name) {
      case "Xposition":
        temp.textShadow = `${value ? value : "0"}px ${
          Yposition ? Yposition : "0"
        }px ${Blur ? Blur : "0"}px ${color ? color : ""}`;
        break;
      case "Yposition":
        temp.textShadow = `${Xposition ? Xposition : "0"}px ${
          value ? value : "0"
        }px ${Blur ? Blur : "0"}px ${color ? color : ""}`;
        break;
      case "Blur":
        temp.textShadow = `${Xposition ? Xposition : "0"}px ${
          Yposition ? Yposition : "0"
        }px ${value ? value : "0"}px ${color ? color : ""}`;
        break;
      case "color":
        temp.textShadow = `${Xposition ? Xposition : "0"}px ${
          Yposition ? Yposition : "0"
        }px ${Blur ? Blur : "0"}px ${value ? value : ""}`;
        break;
      default:
        break;
    }

    setSelectedElement(temp);
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
    <div className="expand-grid m-t-2">
      <div>
        <span className="sub-head">Text Shadow</span>
      </div>
      <div className="style-group">
        <div>
          <div>
            <span>X Position </span>
          </div>
          <div className="flex-row shadow">
            <input
              name="Xposition"
              type="text"
              value={Xposition ? Xposition : ""}
              onChange={handleInput}
              onKeyPress={checkInput}
            ></input>

            <select name="px_m1">
              <option value="px">px</option>
            </select>

            <div className="white">
              <button
                id="+Xpos"
                name="Xposition"
                value={Xposition ? Xposition : ""}
                onClick={increase}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="+Xpos">
                <TiArrowSortedUp />
              </label>

              <button
                id="-Xpos"
                name="Xposition"
                value={Xposition ? Xposition : ""}
                onClick={decrease}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="-Xpos">
                <TiArrowSortedDown />
              </label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>Y Position </span>
          </div>
          <div className="flex-row shadow">
            <input
              name="Yposition"
              type="text"
              value={Yposition ? Yposition : ""}
              onChange={handleInput}
              onKeyPress={checkInput}
            ></input>

            <select name="px_m2">
              <option value="px">px</option>
            </select>

            <div className="white">
              <button
                id="+Ypos"
                name="Yposition"
                value={Yposition ? Yposition : ""}
                onClick={increase}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="+Ypos">
                <TiArrowSortedUp />
              </label>

              <button
                id="-Ypos"
                name="Yposition"
                value={Yposition ? Yposition : ""}
                onClick={decrease}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="-Ypos">
                <TiArrowSortedDown />
              </label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>Blur </span>
          </div>
          <div className="flex-row shadow">
            <input
              name="Blur"
              type="text"
              value={Blur ? Blur : ""}
              onChange={handleInput}
              onKeyPress={checkInput}
            ></input>

            <select name="px_m3">
              <option value="px">px</option>
            </select>

            <div className="white">
              <button
                id="+Blur"
                name="Blur"
                value={Blur ? Blur : ""}
                onClick={increase}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="+Blur">
                <TiArrowSortedUp />
              </label>

              <button
                id="-Blur"
                name="Blur"
                value={Blur ? Blur : ""}
                onClick={decrease}
                style={{ display: "none" }}
              />
              <label className="icon-label" htmlFor="-Blur">
                <TiArrowSortedDown />
              </label>
            </div>
          </div>
        </div>

        <div>
          <div>
            <span>Color </span>
          </div>
          <div>
            <div className="flex-row">
              <input
                className="shadow flex-grow"
                name="color"
                type="text"
                value={color ? color : ""}
                onChange={handleInput}
                onKeyPress={checkInput}
              ></input>
              <input
                className="flex-shrink"
                name="color"
                type="color"
                value={color ? color : ""}
                onChange={handleInput}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextShadow;
