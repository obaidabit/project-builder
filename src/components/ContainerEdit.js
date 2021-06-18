import React, { createRef, useContext, useEffect } from "react";
import { ElementContext2 } from "../ElementContext";
import { MdClose } from "react-icons/md";
import resize from "../resize";
import * as init from "../config/init";

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
    init.resize(selectedTarget, document.querySelector("iframe"));
  };

  const hide = () => {
    props.hide(false);
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
        <div className="media-label ">
          <span>Container Expand: </span>
          <MdClose onClick={hide} />
        </div>
        <div className="flex-row">
          <div
            className="container-btn"
            onClick={() => toggleContainer("container-fluid")}
          >
            Full width
          </div>
          <div
            className="container-btn"
            onClick={() => toggleContainer("container")}
          >
            Normal width
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
