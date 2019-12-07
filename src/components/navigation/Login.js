import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Navigation.css";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  setPassword(pass) {
    this.setState({
      password: pass
    });
  }

  setEmail(email) {
    this.setState({
      email: email
    });
  }

  render() {
    return (
      <div>
        <Form className="login-form">
          <h2 className="text-center">Welcome</h2>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={e => this.setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => this.setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            className="btn-lg btn-dark btn-block"
            disabled={!this.validateForm()}
          >
            Log in
          </Button>
          <br></br>
          <div className="text-center">
            Have no account?
            <a href="signup"> Sign up</a>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
