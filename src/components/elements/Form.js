import React from "react";

export default function Form() {
  return (
    <form className="init">
      <label className="init-label" htmlFor="fname">
        First name:
      </label>
      <input
        className="init-input"
        type="text"
        id="fname"
        name="fname"
        value="John"
      />
      <label className="init-label" htmlFor="lname">
        Last name:
      </label>
      <input
        className="init-input"
        type="text"
        id="lname"
        name="lname"
        value="Doe"
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
