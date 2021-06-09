import React from "react";

export default function Container({ children, className }) {
  return (
    <div
      className={`container ${className}`}
      data-edit={true}
      data-name="container"
      draggable={true}
    >
      {children}
    </div>
  );
}
