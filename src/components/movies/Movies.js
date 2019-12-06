import React, { Component } from "react";

class Movies extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      movies: [],
      comments: [],
      users: [],
      currentId: ""
    };
  }

  getUsers = () => {
    const http = require("http");
    var access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJJZCI6IjVkOTBmYjkxZTNjOTU5NGI1Y2ViMjRiZCIsInJvbGUiOjIsImlhdCI6MTU3MTkxNDEyNiwiZXhwIjoxNjA3OTE0MTI2fQ.Xd72F-hx8o6mwbqi0vS1lzt-DC0tru0mVCCcx1x2hxg";
    const options = {
      hostname: "localhost",
      port: 4000,
      path: "/user",
      method: "GET",
      headers: {
        authorization: `Bearer ${access_token}`,
        "content-type": "application/json;charset=utf-8"
      }
    };

    const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`);
      let data = "";
      res.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on("end", () => {
        //console.log(data);
        console.log(JSON.parse(data.toString()));
        var list = JSON.parse(data.toString());
        this.setState(() => ({
          users: list.users
        }));
        //console.log(JSON.parse(data).explanation);
      });
    });

    req.on("error", error => {
      console.error(error);
    });

    req.end();
  };

  getComments = () => {
    const http = require("http");
    const options = {
      hostname: "localhost",
      port: 4000,
      path: "/comments",
      method: "GET"
    };

    const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`);
      let data = "";
      res.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on("end", () => {
        //console.log(data);
        //console.log(JSON.parse(data.toString()));
        var list = JSON.parse(data.toString());
        console.log(list.comments);
        this.setState(() => ({
          comments: list.comments
        }));
        //console.log(JSON.parse(data).explanation);
      });
    });

    req.on("error", error => {
      console.error(error);
    });

    req.end();
  };

  getMovies = () => {
    //   res.on("end", function() {
    //     var body = Buffer.concat(chunks);
    //     var data = JSON.parse(body);
    //     console.log(data.results);
    //     self.setState(() => ({
    //       movies: data.results
    //     }));
    //   });
    // });
    const http = require("http");

    http
      .get("http://localhost:4000/movies", resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          //console.log(data);
          console.log(JSON.parse(data.toString()));
          var list = JSON.parse(data.toString());
          this.setState(() => ({
            movies: list.movies
          }));
          //console.log(JSON.parse(data).explanation);
        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  };

  deleteUser(id) {
    var self = this;
    var http = require("http");
    var access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJJZCI6IjVkOTBmYjkxZTNjOTU5NGI1Y2ViMjRiZCIsInJvbGUiOjIsImlhdCI6MTU3MTkxNDEyNiwiZXhwIjoxNjA3OTE0MTI2fQ.Xd72F-hx8o6mwbqi0vS1lzt-DC0tru0mVCCcx1x2hxg";

    var options = {
      method: "DELETE",
      hostname: "localhost",
      port: 4000,
      path: `/user/${id}`,
      headers: {
        authorization: `Bearer ${access_token}`,
        "content-type": "application/json;charset=utf-8"
      }
    };

    var req = http.request(options, function(res) {
      var chunks = [];

      res.on("data", function(chunk) {
        chunks.push(chunk);
      });

      res.on("end", function() {
        var body = Buffer.concat(chunks);
        console.log(body);
        console.log(body.toString());
        self.getUsers();
      });
    });

    // req.write(
    //   JSON.stringify({ movies: [{ media_type: "movie", media_id: id }] })
    // );
    req.end();
  }

  deleteComment(id) {
    var self = this;
    var http = require("http");
    var access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJJZCI6IjVkOTBmYjkxZTNjOTU5NGI1Y2ViMjRiZCIsInJvbGUiOjIsImlhdCI6MTU3MTkxNDEyNiwiZXhwIjoxNjA3OTE0MTI2fQ.Xd72F-hx8o6mwbqi0vS1lzt-DC0tru0mVCCcx1x2hxg";

    var options = {
      method: "DELETE",
      hostname: "localhost",
      port: 4000,
      path: `/comments/${id}`,
      headers: {
        authorization: `Bearer ${access_token}`,
        "content-type": "application/json;charset=utf-8"
      }
    };

    var req = http.request(options, function(res) {
      var chunks = [];

      res.on("data", function(chunk) {
        chunks.push(chunk);
      });

      res.on("end", function() {
        var body = Buffer.concat(chunks);
        console.log(body);
        console.log(body.toString());
        self.getComments();
      });
    });

    // req.write(
    //   JSON.stringify({ movies: [{ media_type: "movie", media_id: id }] })
    // );
    req.end();
  }

  deleteMovie(id) {
    var self = this;
    var http = require("http");
    var access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJJZCI6IjVkOTBmYjkxZTNjOTU5NGI1Y2ViMjRiZCIsInJvbGUiOjIsImlhdCI6MTU3MTkxNDEyNiwiZXhwIjoxNjA3OTE0MTI2fQ.Xd72F-hx8o6mwbqi0vS1lzt-DC0tru0mVCCcx1x2hxg";

    var options = {
      method: "DELETE",
      hostname: "localhost",
      port: 4000,
      path: `/movies/${id}`,
      headers: {
        authorization: `Bearer ${access_token}`,
        "content-type": "application/json;charset=utf-8"
      }
    };

    var req = http.request(options, function(res) {
      var chunks = [];

      res.on("data", function(chunk) {
        chunks.push(chunk);
      });

      res.on("end", function() {
        var body = Buffer.concat(chunks);
        console.log(body);
        console.log(body.toString());
        self.getMovies();
      });
    });

    // req.write(
    //   JSON.stringify({ movies: [{ media_type: "movie", media_id: id }] })
    // );
    req.end();
  }

  renderUsers() {
    var users = this.state.users;
    if (users == null || users.count === 0) {
      return null;
    }
    return (
      <table>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                <h5>{user.email}</h5>
                <p>{user.role} | </p>
              </td>
              <td className="align-middle">
                <button onClick={() => this.deleteUser(user._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderComments() {
    var comments = this.state.comments;
    if (comments == null || comments.count === 0) {
      return null;
    }
    return (
      <table>
        <tbody>
          {comments.map(comment => (
            <tr key={comment._id}>
              <td>
                <h5>{comment.movie.name}</h5>
                <p>{comment.text} | </p>
              </td>
              <td className="align-middle">
                <button onClick={() => this.deleteComment(comment._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderMovies() {
    var movies = this.state.movies;
    if (movies == null || movies.count === 0) {
      return null;
    }
    return (
      <table>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>
                <h5>{movie.name}</h5>
                <p>{movie.rating} Rating, </p>
              </td>
              <td className="align-middle">
                <button onClick={() => this.deleteMovie(movie._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  render() {
    const { new_name, new_description } = this.state;
    return (
      <div>
        <div className="container">
          <label>
            Name of the new list: <br />
            <input type="text" value={new_name} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Description: <br />
            <input
              type="text"
              value={new_description}
              onChange={this.handleDescription}
            />
          </label>
          <button onClick={this.getMovies}>Get movies</button>
        </div>
        <button onClick={this.getComments}>Get comments</button>
        <button onClick={this.getUsers}>Get users</button>
        <div className="container">{this.renderMovies()}</div>
        <div className="container">{this.renderComments()}</div>
        <div className="container">{this.renderUsers()}</div>
      </div>
    );
  }
}

export default Movies;
