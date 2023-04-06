import React, { Component } from "react";
import queryString from "query-string";

class QuizSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      usedHints: 0,
      usedFiftyFifty: 0,
    };
  }

  componentDidMount() {
    const { search } = this.props.location;
    const { scores } = queryString.parse(search);
    // do something with the scores value
  }

  render() {
    console.log(this.props);
    return <div>QuizSummary</div>;
  }
}

export default QuizSummary;
