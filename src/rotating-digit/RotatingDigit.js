import React, { Component } from "react";

import "./RotatingDigit.css";

const intervalMs = 1000;

export default class RollingDigit extends Component {
  constructor(props) {
    super(props);
    this.state = { number: props.target, nextNumber: null, rotationState: 0 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.target !== this.props.target) {
      if (this.doneRotating()) setTimeout(this.rotate);
      return false;
    }
    return nextState !== this.state;
  }

  doneRotating() {
    const { number, rotationState } = this.state;
    return number === this.props.target && rotationState === 0;
  }

  rotate = () => {
    let { target } = this.props;
    const { number, rotationState } = this.state;
    let { nextNumber } = this.state;

    let nextRotationState;
    nextNumber = nextNumber === null ? number : nextNumber;
    let nextNextNumber = nextNumber;

    switch (rotationState) {
      case 0:
        nextRotationState = 1;
        const incr = target > number ? 1 : -1;
        nextNextNumber = (nextNumber + incr) % 10;
        break;
      case 1:
        nextRotationState = 2;
        break;
      default:
        nextRotationState = 0;
        break;
    }

    this.setState(
      {
        number: nextNumber,
        nextNumber: nextNextNumber,
        rotationState: nextRotationState
      },
      () => {
        if (nextRotationState === 2) setTimeout(this.rotate);
        else if (target !== number && nextRotationState === 0)
          setTimeout(this.rotate);
      }
    );
  };

  render() {
    const { target } = this.props;
    const { rotationState, number } = this.state;

    let transform, transition;

    if (rotationState === 1) {
      const dir = target > number ? "-" : "";
      transform = `translateY(${dir}100%)`;
    }

    if (rotationState !== 2) {
      transition = `transform ${intervalMs}ms ease-in-out`;
    }

    return (
      <div className="digit-container">
        <div
          className="slider"
          style={{ transition, transform }}
          onTransitionEnd={this.rotate}
        >
          <Digits number={number} />
        </div>
        <div className="gradient-overlay" />
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
