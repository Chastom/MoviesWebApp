import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Navigation.css";

class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      password2: ""
    };
  }

  validateForm() {
    const { email, password, password2 } = this.state;
    return email.length > 0 && password.length > 0 && password2.length > 0;
  }

  setPassword(pass) {
    this.setState({
      password: pass
    });
  }

  setPassword2(pass) {
    this.setState({
      password2: pass
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
          <h2 className="text-center">Register</h2>
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
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={e => this.setPassword2(e.target.value)}
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
            Already registered?
            <a href="login"> Login</a>
          </div>
        </Form>
      </div>
    );
  }
}

export default Signup;
