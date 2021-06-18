import React, { useContext, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ElementContext2 } from "../ElementContext";
import resize from "../resize";

export default function LinkEdit(props) {
  const edit = useRef(null);
  const inputRef = useRef(null);
  const linkTarget = useRef(null);

  const [selectedTarget] = useContext(ElementContext2);

  const addUrl = () => {
    if (selectedTarget && edit.current && inputRef.current) {
      if (selectedTarget.tagName === "A" && inputRef.current.value !== "") {
        selectedTarget.href = inputRef.current.value;
        if (linkTarget.checked) selectedTarget.target = "blank";
        else selectedTarget.target = "";
      }
    }
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
      <div ref={edit} className="link-edit" data-panel>
        <div className="media-label">
          <span>Video Source</span>
          <MdClose onClick={hide} />
        </div>
        <div className="link-edit-attr">
          <input ref={inputRef} type="url" placeholder="URL" />
          <button onClick={addUrl}>Add</button>
          <label htmlFor="link-checkbox">Open new tab</label>
          <input ref={linkTarget} type="checkbox" id="link-checkbox" />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
