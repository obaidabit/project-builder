import React from "react";

export default function Link() {
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <a onClick={handleClick} href="javascript:void(0)">
      Link
    </a>
  );
}
