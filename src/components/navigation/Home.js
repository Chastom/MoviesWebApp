import React, { Component } from "react";

import Movies from "../movies/Movies";

class Home extends Component {
  render() {
    return (
      <div>
        <p>Movies</p>
        <Movies />
      </div>
    );
  }
}

export default Home;
