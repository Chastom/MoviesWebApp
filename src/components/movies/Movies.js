import React from "react";
import { ListGroup, Form, Button, Row, Col, Container } from "react-bootstrap";
import "./Movies.css";
import MovieModal from "./MovieModal";

export default class Movie extends React.Component {
  state = {
    loading: true,
    movies: null,
    modalShow: false,
    selectedMovieId: null,
    email: "",
    role: ""
  };

  async createMovie() {
    try {
      const url = "http://localhost:4000/movies";
      const data = await this.apiRequest(
        url,
        {
          name: this.state.email,
          rating: this.state.role
        },
        "POST"
      );
      if (data.status === 201) {
        this.componentDidMount();
        //this.onNotify("Movie created successfully!", "success-box");
      }
    } catch (error) {
      //this.onNotify(error);
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

  async componentDidMount() {
    console.log("movies mounted");
    const url = "http://localhost:4000/movies";
    const response = await fetch(url);
    const list = await response.json();
    this.setState({ movies: list.movies, loading: false });
  }

  modalOpen = movieId => {
    this.setState(() => ({
      modalShow: true,
      selectedMovieId: movieId
    }));
  };

  modalClose = () => {
    this.setState(() => ({
      modalShow: false
    }));
  };

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.role > 0 &&
      this.state.role <= 10
    );
  }

  setEmail(value) {
    this.setState({ email: value });
  }

  setRole(value) {
    this.setState({ role: value });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.movies) {
      return <div>didn't get any movies</div>;
    }
    var movies = this.state.movies;
    if (movies.count === 0) {
      return <div>there are no movies atm</div>;
    }
    var isAdmin = false;
    var isLogged = false;
    const savedState = JSON.parse(window.sessionStorage.getItem("user_state"));
    if (savedState) {
      //if admin has logged in
      if (savedState.role === 2) {
        isAdmin = true;
      }
      isLogged = true;
    }
    if (isAdmin) {
      return (
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">Create a new movie</h2>
              <Form className="">
                <Form.Group>
                  <Form.Label>
                    <b>Title</b>
                  </Form.Label>
                  <Form.Control
                    placeholder="Movie title"
                    type="text"
                    value={this.state.email}
                    onChange={e => this.setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <b>Rating</b>
                  </Form.Label>
                  <Form.Control
                    placeholder="Value from 0 to 10"
                    type="number"
                    min="1"
                    max="10"
                    step="0.1"
                    value={this.state.role}
                    onChange={e => this.setRole(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  onClick={e => this.createMovie(e)}
                  className="btn-lg btn-dark btn-block"
                  disabled={!this.validateForm()}
                >
                  Create
                </Button>
              </Form>
            </Col>
            <Col xs={8}>
              <ListGroup className="container">
                {movies.map(movie => (
                  <ListGroup.Item
                    className="movieRow"
                    key={movie._id}
                    onClick={() => this.modalOpen(movie._id)}
                  >
                    <h5>{movie.name}</h5>
                    <p>{movie.rating} Rating </p>
                  </ListGroup.Item>
                ))}
                <MovieModal
                  show={this.state.modalShow}
                  onHide={this.modalClose}
                  movieId={this.state.selectedMovieId}
                  isAdmin={isAdmin}
                  isLogged={isLogged}
                />
              </ListGroup>
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <ListGroup className="container">
        {movies.map(movie => (
          <ListGroup.Item
            className="movieRow"
            key={movie._id}
            onClick={() => this.modalOpen(movie._id)}
          >
            <h5>{movie.name}</h5>
            <p>{movie.rating} Rating </p>
          </ListGroup.Item>
        ))}
        <MovieModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          movieId={this.state.selectedMovieId}
          isAdmin={isAdmin}
          isLogged={isLogged}
        />
      </ListGroup>
    );
  }
}
