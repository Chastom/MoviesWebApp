import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const styles = {
  transition: "all 1s ease-out"
};

export default class User extends React.Component {
  state = {
    loading: true,
    user: null,
    email: "",
    role: "",
    redirect: false
  };

  async componentDidMount() {
    console.log("user mounted");
    let currentUrl = window.location.pathname.split("/");
    let headers = { "Content-Type": "application/json" };
    const savedState = JSON.parse(window.sessionStorage.getItem("user_state"));
    headers["Authorization"] = `Bearer ${savedState.token}`;
    const url = "http://localhost:4000/user/" + currentUrl[2];
    const response = await fetch(url, { headers });
    const list = await response.json();
    this.setState({
      user: list.user,
      loading: false,
      email: list.user.email,
      role: list.user.role
    });
  }

  onNotify(message, type) {
    this.setState({
      messageText: message,
      notifyType: type
    });
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.role;
  }

  setEmail(value) {
    this.setState({ email: value });
  }

  setRole(value) {
    this.setState({ role: value });
  }

  async deleteUser() {
    try {
      let currentUrl = window.location.pathname.split("/");
      const url = "http://localhost:4000/user/" + currentUrl[2];
      const data = await this.apiRequest(
        url,
        {
          email: this.state.email,
          role: this.state.role
        },
        "DELETE"
      );
      if (data.status === 200) {
        this.onNotify("User deleted successfully!", "success-box");
        setTimeout(() => {
          this.setState({ redirect: true });
        }, 1500);
      } else {
        this.onNotify("Error occured!", "error-box");
      }
    } catch (error) {
      console.log("errror catch");
      this.onNotify(error);
      console.error(error);
    }
  }

  async updateUser() {
    try {
      let currentUrl = window.location.pathname.split("/");
      const url = "http://localhost:4000/user/" + currentUrl[2];
      const data = await this.apiRequest(
        url,
        {
          email: this.state.email,
          role: this.state.role
        },
        "PATCH"
      );
      if (data.status === 200) {
        this.onNotify("User updated successfully!", "success-box");
      } else {
        this.onNotify("Please enter valid data!", "error-box");
      }
    } catch (error) {
      console.log("errror catch");
      this.onNotify(error);
      console.error(error);
    }
  }

  async apiRequest(url = "", data = {}, method = "") {
    let headers = { "Content-Type": "application/json" };
    const savedState = JSON.parse(window.sessionStorage.getItem("user_state"));
    headers["Authorization"] = `Bearer ${savedState.token}`;
    const response = await fetch(url, {
      method: method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: headers,
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
      return <Redirect to="/users" />;
    }
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.user) {
      return <div>not authorized!</div>;
    }
    var user = this.state.user;
    if (user === "") {
      return <div>there is no such user</div>;
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
        <h2 className="text-center">Selected user</h2>
        <Form className="login-form">
          <Form.Group>
            <Form.Label>
              <b>Email</b>
            </Form.Label>
            <Form.Control
              value={this.state.email}
              onChange={e => this.setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Role</b>
            </Form.Label>
            <Form.Control
              value={this.state.role}
              onChange={e => this.setRole(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            onClick={e => this.updateUser(e)}
            className="btn-lg btn-dark"
            disabled={!this.validateForm()}
          >
            Update
          </Button>
          <span className="m-1"></span>
          <Button onClick={e => this.deleteUser(e)} className="btn-lg btn-dark">
            Delete
          </Button>
        </Form>
      </div>
    );
  }
}
