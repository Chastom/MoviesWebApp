import React from "react";
import { ListGroup } from "react-bootstrap";
import "./Movies.css";
import MovieModal from "./MovieModal";

export default class Movie extends React.Component {
  state = {
    loading: true,
    movies: null,
    modalShow: false,
    selectedMovieId: null
  };

  async componentDidMount() {
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
    return (
      <ListGroup className="container">
        {movies.map(movie => (
          <ListGroup.Item
            key={movie._id}
            onClick={() => this.modalOpen(movie._id)}
          >
            <h5>{movie.name}</h5>
            <p>{movie.rating} Rating </p>
            {/* <td className="align-middle">
                <button onClick={() => this.deleteMovie(movie._id)}>
                  Remove
                </button>
              </td> */}
          </ListGroup.Item>
        ))}
        <MovieModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          movieId={this.state.selectedMovieId}
        />
      </ListGroup>
    );
  }
}
