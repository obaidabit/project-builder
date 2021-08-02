import React from "react";
import Image from "../elements/Image";
export default function VioletLogInLayout() {
  return (
    <div id="VioletLogInLayout">
      <div className="main">
        <p className="sign" align="center">
          Sign in
        </p>
        <form className="form1">
          <input
            className="pass"
            type="text"
            align="center"
            placeholder="Username"
          />
          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
          />
          <a className="submit" align="center">
            Sign in
          </a>
          <p className="forgot" align="center">
            <a href="javascript::void()">Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
