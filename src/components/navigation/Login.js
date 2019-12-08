import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Navigation.css";

const styles = {
  transition: "all 1s ease-out"
};

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      messageText: "",
      notifyType: "",
      redirect: false
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

  onNotify(message, type) {
    this.setState({
      messageText: message,
      notifyType: type
    });
  }

  redirect() {
    this.setState({
      redirect: true
    });
  }

  async handleClick(e) {
    try {
      const data = await this.postData("http://localhost:4000/user/login", {
        email: this.state.email,
        password: this.state.password
      });
      if (data.status === 200) {
        this.onNotify("Login was successfull!", "success-box");
        const userState = {
          token: data.response.token,
          role: data.response.role
        };
        window.sessionStorage.setItem("user_state", JSON.stringify(userState));
        var self = this;
        this.props.hasLogged();
        setTimeout(function() {
          self.redirect();
        }, 1000);
      } else {
        this.onNotify(
          "Please make sure you have entered correct credentials!",
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
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
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
            onClick={e => this.handleClick(e)}
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
