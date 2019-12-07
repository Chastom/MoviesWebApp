import React from "react";
import { ListGroup, Modal, Button } from "react-bootstrap";
import "./Movies.css";

export default class MovieModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      comments: null
    };
  }

  async componentDidMount() {
    const url = "http://localhost:4000/comments";
    const response = await fetch(url);
    const list = await response.json();
    this.setState({ comments: list.comments, loading: false });
  }

  returnList(comments) {
    if (comments.length === 0) {
      return (
        <div>There are no comments for this movie yet. Be the first one!</div>
      );
    }
    return (
      <ListGroup className="container">
        {comments.map(comment => (
          <ListGroup.Item key={comment._id}>
            <h5>{comment.movie.name}</h5>
            <p>{comment.text}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  render() {
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
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
