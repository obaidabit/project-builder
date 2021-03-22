import React, { useEffect, useContext } from "react";
import { ElementContext } from "../ElementContext";

export default function Iframe({ children, ...props }) {
  const [, setSelectedElement] = useContext(ElementContext);

  useEffect(() => {
    const frame = document.querySelector("iframe");
    frame.contentWindow.addEventListener("click", (e) => {
      setSelectedElement(e.target);
    });
  }, []);

  return (
    <div className="target-page">
      <iframe title="Target page" {...props}></iframe>
    </div>
  );
}
