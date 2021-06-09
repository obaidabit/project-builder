import React from "react";
import Container from "./Container";
import Link from "./Link";
import Text from "./Text";

export default function Nav() {
  return (
    <nav className="navbar" data-name="navbar" draggable={true}>
      <Container className="navbar-container">
        <div draggable={true} className="d-flex init">
          <Link />
        </div>

        <div draggable={true} className="d-flex">
          <Text />
          <Text />
          <Text />
        </div>
      </Container>
    </nav>
  );
}
