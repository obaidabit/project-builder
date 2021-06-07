/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Link() {
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    // eslint-disable-next-line no-script-url
    <a onClick={handleClick} href="javascript:void(0)">
      Link
    </a>
  );
}
