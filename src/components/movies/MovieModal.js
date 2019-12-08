import React from "react";
import { Redirect } from "react-router-dom";
import { ListGroup, Modal, Button } from "react-bootstrap";
import "./Movies.css";

export default class MovieModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      comments: null,
      redirect: false,
      redirectComment: false,
      value: "",
      movieId: "",
      commentId: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:4000/comments";
    const response = await fetch(url);
    const list = await response.json();
    this.setState({ comments: list.comments, loading: false, value: "" });
  }

  redirectToMovie() {
    this.setState({ redirect: true });
  }

  redirectToComment(id) {
    this.setState({ commentId: id, redirectComment: true });
  }

  returnList(comments) {
    if (comments.length === 0) {
      return (
        <div>There are no comments for this movie yet. Be the first one!</div>
      );
    }
    return (
      <ListGroup className="comments">
        {comments.map(comment => (
          <div
            key={comment._id}
            className={this.props.isAdmin ? "comments-admin-div" : ""}
          >
            <ListGroup.Item
              onClick={
                this.props.isAdmin
                  ? () => this.redirectToComment(comment._id)
                  : ""
              }
              className={this.props.isAdmin ? "comments-admin" : "comments"}
            >
              <p>{comment.text}</p>
            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
    );
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

  async handleKeyDown(e) {
    if (e.key === "Enter") {
      try {
        const url = "http://localhost:4000/comments/";
        const data = await this.apiRequest(
          url,
          {
            movieId: this.state.movieId,
            text: this.state.value
          },
          "POST"
        );
        if (data.status === 201) {
          this.componentDidMount();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleChange(event) {
    if (this.props.movieId) {
      this.setState({ value: event.target.value, movieId: this.props.movieId });
    } else {
      this.setState({ value: event.target.value });
    }
  }

  handleFocus(e) {
    if (e.target.selectionEnd) {
      e.target.selectionEnd = 0;
    }
  }

  render() {
    if (this.state.redirect) {
      var redirect = "/movie/" + this.props.movieId;
      return <Redirect to={redirect} />;
    }
    if (this.state.redirectComment) {
      var redirect2 = "/comment/" + this.state.commentId;
      return <Redirect to={redirect2} />;
    }
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.comments) {
      return <div>didn't get any comments</div>;
    }
    var comments = this.state.comments;
    if (this.props.movieId) {
      var self = this;
      comments = comments.filter(
        comment => comment.movie._id === self.props.movieId
      );
    }

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Comments...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.returnList(comments)}</Modal.Body>
        {this.props.isLogged && (
          <div>
            <p className="comment-info">
              <b>Type in your comment and press enter</b>
            </p>
            <textarea
              onFocus={this.handleFocus}
              className="comment-section"
              type="text"
              onKeyDown={this.handleKeyDown}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
        )}
        <Modal.Footer>
          {this.props.isAdmin && (
            <Button onClick={() => this.redirectToMovie()}>Edit movie</Button>
          )}

          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
