import React from "react";
import { ListGroup } from "react-bootstrap";

export default class Movie extends React.Component {
  state = {
    loading: true,
    users: null,
    modalShow: false,
    selectedUserId: null
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

  render() {
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
            //onClick={() => this.modalOpen(movie._id)}
          >
            <h5>{user.email}</h5>
            <p>Role: {user.role} </p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}
