import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form } from "react-bootstrap";

class Navigation extends Component {
  render() {
    var isAdmin = false;
    const savedState = JSON.parse(window.sessionStorage.getItem("user_state"));
    if (savedState) {
      //if admin has logged in
      if (savedState.role === 2) {
        isAdmin = true;
      }
    }
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
              {this.props.isLogged && isAdmin ? (
                <Nav.Link as={Link} to="/movies">
                  Movies
                </Nav.Link>
              ) : (
                ""
              )}
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
  }
}

export default Navigation;
