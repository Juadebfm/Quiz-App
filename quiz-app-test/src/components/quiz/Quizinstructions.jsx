import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineQuiz } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";

import Answer from "../../assets/logosage (6).jpg";

const Quizinstructions = () => {
  return (
    <>
      <div className="instructions">
        <h1>Instructions</h1>
        <p>
          Ensure you read the instructions carefully before attempting the tests
          in the test section
        </p>
        <ul className="browser-default" id="main-list">
          <li>
            The test has a duration of 3 minutes and ends as soon as your time
            elapse
          </li>
          <li>Each test consist of 28 questions</li>
          <li>
            Every question contains 4 options
            <img src={Answer} alt="Quiz app" />
          </li>
          <li>
            Select the option which best answers the question by clicking (or
            selecting) it
            <img src={Answer} alt="Quiz app" />
          </li>
          <li>
            Each questions has 2 helper lines namely
            <ul id="sublist">
              <li>50-50 chances</li>
              <li>Hints</li>
            </ul>
          </li>
          <li>
            Selecting 50-50 lifeline by clicking the icon{" "}
            <MdOutlineQuiz className="lifeline" /> will remove{" "}
            <b>2 wrong answers</b>, leaving one correct answer and one wrong
            answer
            <img src={Answer} alt="" />
          </li>
          <li>
            Using a hint by clicking the icon{" "}
            <HiLightBulb className="lifeline" /> will remove one wrong answer
            leaving <b>two wrong answers</b> and <b>one correct answer</b>. You
            can use as many as possible on a single question.{" "}
          </li>
          <li>
            You can quit test when it has started except your time runs out or
            you click the "Test Scores" button.
          </li>
          <li>The timer starts as soon as the Test loads</li>
          <li>Let's do this if you think you've got what it takes</li>
        </ul>
        <div className="buttons">
          <span className="left">
            <Link to="/">Back to Homepage</Link>
          </span>
          <span className="right">
            <Link to="/quiz">Start Test</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Quizinstructions;
