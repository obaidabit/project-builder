import React from "react";

export default function Iframe({ children, ...props }) {
  return (
    <div className="target-page">
      <iframe title="Target page" {...props}></iframe>
    </div>
  );
}
