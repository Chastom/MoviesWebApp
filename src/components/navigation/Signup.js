import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Navigation.css";

const styles = {
  transition: "all 1s ease-out"
};

class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      password2: "",
      scale: 20,
      errorText: "Oops, something went wrong!"
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

  onScale(error) {
    console.log("scalled up");
    this.setState({
      scale: this.state.scale < 10 ? 80 : 0,
      errorText: error
    });
  }

  async handleClick(e) {
    try {
      const data = await this.postData("http://localhost:4000/user/signup", {
        email: this.state.email,
        password: this.state.password
      });
      this.onScale("Succesfully created!");
      console.log(JSON.stringify(data));
    } catch (error) {
      console.log("errror catch");
      this.onScale();
      //styles.transition = "all 2s ease-in-out";
      //styles.height = "400px";
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
    return await response.json();
  }

  render() {
    console.log(this.state.scale);
    return (
      <div>
        <div
          id="box"
          style={{ ...styles, height: this.state.scale }}
          onClick={e => this.onScale("")}
        >
          {this.state.errorText}
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
