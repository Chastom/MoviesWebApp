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
          <h1 className="text">KTU</h1>
          <h2 className="text2">&copy; MOVIE KINGDOM - BY TAUTVYDAS</h2>
          <h2 className="text3">-2019-</h2>
        </footer>
      </div>
    );
  }
}

export default App;
