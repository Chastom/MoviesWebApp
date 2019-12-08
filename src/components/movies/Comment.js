import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const styles = {
  transition: "all 1s ease-out"
};

export default class Comment extends React.Component {
  state = {
    loading: true,
    user: null,
    email: "",
    role: "",
    redirect: false,
    message: ""
  };

  async componentDidMount() {
    let currentUrl = window.location.pathname.split("/");
    let headers = { "Content-Type": "application/json" };
    const savedState = JSON.parse(window.sessionStorage.getItem("user_state"));
    headers["Authorization"] = `Bearer ${savedState.token}`;
    const url = "http://localhost:4000/comments/" + currentUrl[2];
    const response = await fetch(url, { headers });
    const list = await response.json();
    if (response.status === 200) {
      this.setState({
        user: list.comment,
        loading: false,
        email: list.comment.movie.name,
        role: list.comment.text
      });
    } else if (response.status === 404) {
      this.setState({ loading: false, message: "User not found!" });
    }
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
      const url = "http://localhost:4000/comments/" + currentUrl[2];
      const data = await this.apiRequest(url, {}, "DELETE");
      if (data.status === 200) {
        this.onNotify("Comment deleted successfully!", "success-box");
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
      const url = "http://localhost:4000/comments/" + currentUrl[2];
      const data = await this.apiRequest(
        url,
        {
          text: this.state.role
        },
        "PATCH"
      );
      if (data.status === 200) {
        this.onNotify("Comment updated successfully!", "success-box");
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
      return <Redirect to="/" />;
    }
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.user) {
      return (
        <div>{this.state.message ? this.state.message : "not authorized!"}</div>
      );
    }
    var user = this.state.user;
    if (user === "") {
      return <div>there is no such comment</div>;
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
        <h2 className="text-center">Selected comment</h2>
        <Form className="comment-form">
          <h2>{this.state.email}</h2>
          <Form.Group>
            <Form.Label>
              <b>Text</b>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
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
