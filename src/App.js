import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Movies from "./components/movies/Movies";
import Home from "./components/navigation/Home";
import Login from "./components/navigation/Login";
import Signup from "./components/navigation/Signup";
import Error from "./components/navigation/Error";
import Navigation from "./components/navigation/Navigation";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLogged: false
    };
  }

  hasLogged() {
    this.setState({ isLogged: true });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation isLogged={this.state.isLogged} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route
              path="/login"
              render={props => (
                <Login {...props} hasLogged={this.hasLogged.bind(this)} />
              )}
            />
            <Route path="/movies" component={Movies} />
            <Route path="/signup" component={Signup} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
