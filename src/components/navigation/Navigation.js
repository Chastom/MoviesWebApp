import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form } from "react-bootstrap";

const Navigation = () => {
  return (
    <div>
      <Navbar style={{ background: "#309c6f" }} expand="lg">
        <Navbar.Brand as={Link} to="/">
          Movie Kingdom
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/movies">
              Movies
            </Nav.Link>
          </Nav>
          <Form inline>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
