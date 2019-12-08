import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default class User extends React.Component {
  state = {
    loading: true,
    user: null
  };

  async componentDidMount() {
    console.log("user mounted");
    let headers = { "Content-Type": "application/json" };
    const savedState = JSON.parse(window.sessionStorage.getItem("user_state"));
    headers["Authorization"] = `Bearer ${savedState.token}`;
    const url = "http://localhost:4000/user/" + this.props.userId;
    const response = await fetch(url, { headers });
    const list = await response.json();
    this.setState({ user: list.user, loading: false });
  }

  deleteUser() {}

  render() {
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
        <h2 className="text-center">Selected user</h2>
        <Form className="login-form">
          <Form.Group>
            <Form.Label>
              <b>Email</b>
            </Form.Label>
            <Form.Control
              value={user.email}
              onChange={e => this.setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Role</b>
            </Form.Label>
            <Form.Control
              value={user.role}
              onChange={e => this.setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button onClick={e => this.deleteUser(e)} className="btn-lg btn-dark">
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
