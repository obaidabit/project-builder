import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function Iframe({ children, ...props }) {
  const [contentRef, setContentRef] = useState(null);
  const doc = contentRef?.contentWindow?.document;

  const mountNode = doc?.body;
  const insertionTarget = doc?.createElement("link");
  if (insertionTarget) {
    doc.head.append(insertionTarget);
  }

  return (
    <div className="target-page">
      <iframe
        title="Target page"
        ref={setContentRef}
        {...props}
        target={insertionTarget}
      >
        {mountNode && createPortal(children, mountNode)}
      </iframe>
    </div>
  );
}
