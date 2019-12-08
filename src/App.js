import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Users from "./components/users/Users";
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

  componentDidMount() {
    const savedState = JSON.parse(window.sessionStorage.getItem("user_state"));
    if (savedState && !this.state.isLogged) {
      this.hasLogged();
    }
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
            <Route path="/users" component={Users} />
            <Route path="/signup" component={Signup} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
