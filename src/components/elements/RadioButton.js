import React from "react";

export default function RadioButton() {
  return (
    <label className="radio" contenteditable="false">
      This is Radio Button
      <input type="radio" className="radio-input" />
      <div className="radio-radio"></div>
    </label>
  );
}
