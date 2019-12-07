import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Movies from "./components/movies/Movies";
import Home from "./components/navigation/Home";
import Login from "./components/navigation/Login";
import Signup from "./components/navigation/Signup";
import Error from "./components/navigation/Error";
import Navigation from "./components/navigation/Navigation";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
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
