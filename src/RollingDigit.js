import React, { Component } from "react";

import "./RollingDigit.css";

const intervalMs = 1000;

export default class RollingDigit extends Component {
  constructor(props) {
    super(props);
    this.state = { number: props.target, curState: 0 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.target !== this.props.target) {
      setTimeout(this.nextState);
      return false;
    }
    return nextState !== this.state;
  }

  nextState = () => {
    let { target } = this.props;
    const { number, curState } = this.state;

    let nextState;
    let nextNumber = number;

    switch (curState) {
      case 0:
        nextState = 1;
        break;
      case 1:
        nextState = 2;
        const incr = target > number ? 1 : -1;
        nextNumber = (number + incr) % 10;
        break;
      default:
        nextState = 0;
        break;
    }

    this.setState({ number: nextNumber, curState: nextState }, () => {
      if (nextState === 2) setTimeout(this.nextState);
      else if (target !== number && nextState === 0) setTimeout(this.nextState);
    });
  };

  render() {
    console.log("render");
    const { target } = this.props;
    const { curState, number } = this.state;

    let transform, transition;

    if (curState === 1) {
      const dir = target > number ? "-" : "";
      transform = `translateY(${dir}100%)`;
    }

    if (curState !== 2) {
      transition = `transform ${intervalMs}ms ease-in-out`;
    }

    return (
      <div className="digit-container">
        <div
          className="slider"
          style={{ transition, transform }}
          onTransitionEnd={this.nextState}
        >
          <Digits number={number} />
        </div>
      </div>
    );
  }
}

const Digits = React.memo(({ number }) => (
  <>
    <Digit key={number - 1} number={number - 1} />
    <Digit key={number} number={number} />
    <Digit key={number + 1} number={number + 1} />
  </>
));

const Digit = React.memo(({ number }) => {
  return <div className="digit">{number % 10}</div>;
});
