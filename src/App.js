import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Users from "./components/users/Users";
import User from "./components/users/User";
import Movie from "./components/movies/Movie";
import Comment from "./components/movies/Comment";
import Home from "./components/navigation/Home";
import Login from "./components/navigation/Login";
import Signup from "./components/navigation/Signup";
import Error from "./components/navigation/Error";
import Navigation from "./components/navigation/Navigation";
import "./App.css";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLogged: false,
      idSelected: ""
    };
  }

  hasLogged() {
    this.setState({ isLogged: true });
  }

  selectId(id) {
    this.setState({ idSelected: id });
  }

  componentDidMount() {
    const savedState = JSON.parse(window.sessionStorage.getItem("user_state"));
    if (savedState && !this.state.isLogged) {
      this.hasLogged();
    }
  }

  render() {
    return (
      <div id="container">
        <div id="container">
          <BrowserRouter>
            <div id="header">
              <Navigation isLogged={this.state.isLogged} />
            </div>
            <div id="body">
              <Switch>
                <Route path="/" component={Home} exact />
                <Route
                  path="/login"
                  render={props => (
                    <Login {...props} hasLogged={this.hasLogged.bind(this)} />
                  )}
                />
                <Route
                  path="/users"
                  render={props => (
                    <Users {...props} selectId={this.selectId.bind(this)} />
                  )}
                />
                <Route
                  path="/user"
                  render={props => (
                    <User {...props} userId={this.state.idSelected} />
                  )}
                />
                <Route path="/comment" component={Comment} />
                <Route path="/movie" component={Movie} />
                <Route path="/signup" component={Signup} />
                <Route component={Error} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
        <footer id="footer">
          <svg height="52" width="200" className="center">
            <linearGradient
              id="grad1"
              gradientUnits="userSpaceOnUse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="10%" stopColor="#309c6f" stopOpacity="50%" />
              <stop offset="79%" stopColor="#ffff00" stopOpacity="85%" />{" "}
            </linearGradient>
            <ellipse cx="100" cy="21.5" rx="40" ry="20" fill="url(#grad1)" />
            <text
              fill="#2e2e2e"
              font-weight="bold"
              font-size="20"
              font-family="Verdana"
              x="86"
              y="27"
            >
              TK
            </text>
            Sorry, your browser does not support inline SVG.
          </svg>
          <h2 className="text2">&copy; MOVIE KINGDOM</h2>
          <h2 className="text3">-2019-</h2>
        </footer>
      </div>
    );
  }
}

export default App;
