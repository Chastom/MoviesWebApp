import React from "react";
import { ListGroup } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class Users extends React.Component {
  state = {
    loading: true,
    users: null,
    modalShow: false,
    selectedUserId: null,
    redirect: false,
    userId: ""
  };

  async componentDidMount() {
    console.log("users mounted");
    let headers = { "Content-Type": "application/json" };
    const savedState = JSON.parse(window.sessionStorage.getItem("user_state"));
    headers["Authorization"] = `Bearer ${savedState.token}`;
    const url = "http://localhost:4000/user";
    const response = await fetch(url, { headers });
    const list = await response.json();
    this.setState({ users: list.users, loading: false });
  }

  redirectToUser(id) {
    this.setState({ userId: id, redirect: true });
    this.props.selectId(id);
  }

  render() {
    if (this.state.redirect) {
      var redirect = "/user/" + this.state.userId;
      return <Redirect to={redirect} />;
    }
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.users) {
      return <div>not authorized!</div>;
    }
    var users = this.state.users;
    if (users.count === 0) {
      return <div>there are no users atm</div>;
    }
    return (
      <ListGroup className="container">
        {users.map(user => (
          <ListGroup.Item
            className="movieRow"
            key={user._id}
            onClick={() => this.redirectToUser(user._id)}
          >
            <h5>{user.email}</h5>
            <p>Role: {user.role} </p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}
