import React, { createRef, useContext, useEffect } from "react";
import { ElementContext2 } from "../ElementContext";
import resize from "../resize";

export default function ColumnsEdit(props) {
  const [selectedTarget] = useContext(ElementContext2);
  const edit = createRef(null);

  const createColumns = (type, num, classList) => {
    let elements = [];
    for (let i = 0; i < num; i++) {
      const col = document.createElement(type);
      col.className = classList[i];
      col.id = Math.random().toString(36).substr(2, 5);
      elements.push(col);
    }
    return elements;
  };

  const addColumn = () => {
    if (selectedTarget) {
      const col = document.createElement("div");
      col.className = "col init";
      selectedTarget.appendChild(col);
    }
  };

  const removeColumn = () => {
    if (selectedTarget) {
      if (selectedTarget.children.length >= 2) {
        selectedTarget.children[selectedTarget.children.length - 1].remove();
      }
    }
  };

  const addCustomeLayout = (layout) => {
    if (!layout || !selectedTarget) return;
    let elements = [];

    switch (layout) {
      case "1/3":
        elements = createColumns("div", 2, ["col-4 init", "col-8 init"]);
        break;
      case "2/3":
        elements = createColumns("div", 2, ["col-8 inti", "col-4 init"]);
        break;
      case "2/4":
        elements = createColumns("div", 3, [
          "col-3 init",
          "col-6 init",
          "col-3 init",
        ]);
        break;
      default:
        break;
    }
    selectedTarget.innerHTML = "";
    elements.forEach((col) => selectedTarget.appendChild(col));
  };

  useEffect(() => {
    if (selectedTarget && edit.current) {
      resize(edit.current, selectedTarget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  if (props.show)
    return (
      <div className="columns-edit shadow" ref={edit} data-panel>
        <div className="columns-label">Columns number:</div>
        <div className="columns-btn">
          <span onClick={addColumn}>Add</span>
          <span onClick={removeColumn}>Remove</span>
        </div>

        <div className="columns-label">Custome layout:</div>
        <div className="columns-btn">
          <span onClick={() => addCustomeLayout("1/3")}>1/3</span>
          <span onClick={() => addCustomeLayout("2/3")}>2/3</span>
          <span onClick={() => addCustomeLayout("2/4")}>2/4</span>
        </div>
      </div>
    );
  return null;
}
