import React, { Component } from "react";

import RollingDigit from "./RollingDigit";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 1 };
    this.inputRef = React.createRef();
  }

  update = () => {
    let current = parseInt(this.inputRef.current.value);
    if (isNaN(current)) current = 1;
    current = current % 10;
    this.setState({ current });
  };

  render() {
    return (
      <div className="App">
        <RollingDigit target={this.state.current} />
        <input ref={this.inputRef} />{" "}
        <button onClick={this.update}>Update</button>
      </div>
    );
  }
}
