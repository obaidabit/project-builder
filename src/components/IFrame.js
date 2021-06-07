import React, { useEffect, useContext } from "react";
import { ElementContext, ElementContext2 } from "../ElementContext";

export default function Iframe(props) {
  const [, setSelectedElement] = useContext(ElementContext);
  const [, setSelectedTarget] = useContext(ElementContext2);

  useEffect(() => {
    const frame = document.querySelector("iframe");
    frame.contentWindow.addEventListener("click", (e) => {
      setSelectedElement(e.target.style);
      setSelectedTarget(e.target);

      const oldSelected =
        frame.contentWindow.document.querySelector("[data-selected]");
      if (oldSelected) {
        oldSelected.removeAttribute("data-selected");
      }
      e.target.setAttribute("data-selected", "");
      props.closeEdit();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="target-page">
      <iframe title="Target page"></iframe>
    </div>
  );
}
