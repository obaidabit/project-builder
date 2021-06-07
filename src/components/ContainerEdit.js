import React, { createRef, useContext, useEffect } from "react";
import { ElementContext2 } from "../ElementContext";
import resize from "../resize";

export default function ContainerEdit(props) {
  const [selectedTarget] = useContext(ElementContext2);
  const edit = createRef(null);

  const toggleContainer = (cName) => {
    if (
      selectedTarget.classList.contains("container") ||
      selectedTarget.classList.contains("container-fluid")
    ) {
      selectedTarget.className = cName;
    }
    resize(edit.current, selectedTarget);
  };

  useEffect(() => {
    if (selectedTarget && edit.current) {
      resize(edit.current, selectedTarget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  if (props.show) {
    return (
      <div className="shadow container-edit" ref={edit} data-panel>
        <div onClick={() => toggleContainer("container-fluid")}>Full width</div>
        <div onClick={() => toggleContainer("container")}>Normal width</div>
      </div>
    );
  } else {
    return null;
  }
}
