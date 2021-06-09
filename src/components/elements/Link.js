/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Link() {
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    // eslint-disable-next-line no-script-url
    <a
      className="link"
      onClick={handleClick}
      data-name="link"
      data-edit={true}
      href="javascript:void(0)"
      draggable={true}
    >
      Link
    </a>
  );
}
