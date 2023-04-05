import React, { Component } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";
import { CiTimer } from "react-icons/ci";

class Quiz extends Component {
  constructor(props) {
    super(props);
  }
  increaseCount = () => {
    this.setState({
      counter: 5,
    });
  };
  render() {
    return (
      <>
        <h1 className="main-topic">Quiz Test</h1>
        <div className="questions">
          <div className="lifeline-container">
            <p>
              <MdOutlineQuiz className="lifeline" />
              <span>2</span>
            </p>
            <p>
              <HiLightBulb className="lifeline" />
              <span>2</span>
            </p>
          </div>
          <div className="timer-option">
            <p>
              <span>1 of 15</span>
              <span>
                <CiTimer />
                <span> 3:00</span>
              </span>
            </p>
          </div>
          <h5>Google was founded in what year?</h5>
          <div className="options-container">
            <p className="option">1998</p>
            <p className="option">1997</p>
          </div>
          <div className="options-container">
            <p className="option">1999</p>
            <p className="option">2000</p>
          </div>
          <div className="button-container">
            <button className="prev">Previous</button>
            <button className="quit">Quit</button>
            <button className="next">Next</button>
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
