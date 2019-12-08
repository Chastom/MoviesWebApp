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
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:4000/comments";
    const response = await fetch(url);
    const list = await response.json();
    this.setState({ comments: list.comments, loading: false });
  }

  redirectToMovie() {
    this.setState({ redirect: true });
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
          <ListGroup.Item key={comment._id} className="comments">
            <p>{comment.text}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  handleKeyDown = e => {
    if (e.key === "Enter") {
      console.log(this.state.value);
    }
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
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
