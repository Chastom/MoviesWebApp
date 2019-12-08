import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Navigation.css";

const styles = {
  transition: "all 1s ease-out"
  //transition: "all 2s ease-in-out"
};

class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      password2: "",
      messageText: "",
      notifyType: ""
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

  onNotify(message, type) {
    this.setState({
      messageText: message,
      notifyType: type
    });
  }

  async handleClick(e) {
    if (this.state.password !== this.state.password2) {
      this.onNotify(
        "Please enter the same password in both fields!",
        "error-box"
      );
      return;
    }
    try {
      const data = await this.postData("http://localhost:4000/user/signup", {
        email: this.state.email,
        password: this.state.password
      });
      if (data.status === 409) {
        this.onNotify("User with this mail already exists!", "error-box");
      } else if (data.status === 500) {
        this.onNotify("Please enter a valid email address!", "error-box");
      } else if (data.status === 201) {
        this.onNotify("Registration was successful!", "success-box");
        console.log(JSON.stringify(data.response));
      } else {
        this.onNotify(
          "An error has occured, please try again later...",
          "error-box"
        );
      }
    } catch (error) {
      console.log("errror catch");
      this.onNotify(error);
      console.error(error);
    }
  }

  async postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    });
    var status = response.status;
    var res = await response.json();
    return {
      status: status,
      response: res
    };
  }

  render() {
    return (
      <div>
        <div
          id={this.state.messageText ? this.state.notifyType : "box"}
          style={{ ...styles }}
          onClick={e => this.onNotify("", "box")}
        >
          {this.state.messageText}
        </div>
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
            onClick={e => this.handleClick(e)}
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
