import React, { useEffect, useContext } from "react";
import { ElementContext, ElementContext2 } from "../ElementContext";

export default function Iframe({ children, ...props }) {
  const [, setSelectedElement] = useContext(ElementContext);
  const [, setSelectedTarget] = useContext(ElementContext2);

  useEffect(() => {
    const frame = document.querySelector("iframe");
    frame.contentWindow.addEventListener("click", (e) => {
      setSelectedElement(e.target.style);
      setSelectedTarget(e.target);
    });
  }, []);

  return (
    <div className="target-page">
      <iframe title="Target page" {...props}></iframe>
    </div>
  );
}
