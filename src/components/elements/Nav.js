import React from "react";
import Container from "./Container";
import Link from "./Link";
import Text from "./Text";
import { FiMenu } from "react-icons/fi";

export default function Nav() {
  return (
    <nav className="navbar" data-name="navbar" draggable={true}>
      <Container className="navbar-container">
        <div draggable={true} className="d-flex init">
          <Link />
        </div>

        <div draggable={true} className="navbar-links">
          <Text />
          <Text />
          <Text />
        </div>
        <div className="navbar-icon">
          <FiMenu />
        </div>
      </Container>
    </nav>
  );
}
