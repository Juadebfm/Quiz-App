import React, { Component } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { CiTimer } from "react-icons/ci";
import { Link } from "react-router-dom";
import M from "materialize-css";
import Swal from "sweetalert2";
import ReactModal from "react-modal";

import questions from "../../../src/questions/QuestionsData.json";
import isEmpty from "../../utils/isEmpty";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      prevQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 3,
      previousRandomNumbers: [],
      fiftyFifty: 2,
      usedFiftyFifty: false,
      time: {},
    };
    this.interval = null;
    this.modal = {
      showModal: false,
    };
  }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, prevQuestion } =
      this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      prevQuestion
    );
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    prevQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      prevQuestion = questions[currentQuestionIndex - 1];

      const answer = currentQuestion.answer;

      this.setState(
        {
          currentQuestion,
          nextQuestion,
          prevQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          this.showOptions();
        }
      );
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  };

  handleNextButtonClick = () => {
    if (this.state.nextQuestion != undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.prevQuestion
          );
        }
      );
    } else {
      const nextBtn = document.getElementById("next");
      nextBtn.style.visibility = "hidden";
    }
  };

  handlePrevButtonClick = () => {
    if (this.state.prevQuestion != undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.prevQuestion
          );
        }
      );
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next":
        this.handleNextButtonClick();
        break;
      case "prev":
        this.handlePrevButtonClick();
        break;
      default:
        break;
    }
  };

  correctAnswer = () => {
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswer: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.prevQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: "Wrong Answer!",
      classes: "toast-invalid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.prevQuestion
          );
        }
      }
    );
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    this.setState({
      usedFiftyFifty: false,
    });
  };

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;
      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers:
                  prevState.previousRandomNumbers.concat(randomNumber),
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomNumbers.length >= 3) break;
      }
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });
      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(newRandomNumber) &&
                !randomNumbers.includes(indexOfAnswer)
              ) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true,
      }));
    }
  };

  startTimer = () => {
    const countDowntime = Date.now() + 150000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDowntime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          },
        });
      }
    }, 1000);
  };

  endGame = async () => {
    const { state } = this;
    const scores = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      usedFiftyFifty: 2 - state.fiftyFifty,
      hintsUsed: 3 - state.hints,
    };
    console.log(scores);
    setTimeout(() => {
      this.handleOpenModal();
    }, 30);
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  // handleTakeTestAgainClick = () => {
  //   this.handleCloseModal();
  //   window.location.reload();
  // };

  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      numberOfQuestions,
      hints,
      fiftyFifty,
      time,
      score,
      numberOfAnsweredQuestions,
    } = this.state;
    let stats;
    let remark;

    const userScore = this.state.score;
    if (userScore <= 30) {
      remark = "You need more practice!";
    } else if (userScore > 30 && userScore <= 50) {
      remark = "Better luck next time";
    } else if (userScore <= 70 && userScore > 50) {
      remark = "You can do better";
    } else if (userScore >= 71 && userScore <= 84) {
      remark = "You did great";
    } else {
      remark = "Excellent score";
    }

    if (numberOfAnsweredQuestions > 0) {
      stats = (
        <>
          <div id="testscores" className="container">
            <h1>Test Done</h1>
            <h4>{remark}</h4>
            <h2>
              Your Score:{" "}
              {Math.round(
                (this.state.score / this.state.numberOfQuestions) * 100
              )}
              %
            </h2>

            <div className="stats">
              <span className="stat-left">Total number of questions:</span>
              <span className="stat-right">{this.state.numberOfQuestions}</span>
            </div>
            <div className="stats">
              <span className="stat-left">
                Total number of questions answered:
              </span>
              <span className="stat-right">
                {this.state.numberOfAnsweredQuestions}
              </span>
            </div>
            <div className="stats">
              <span className="stat-left">Total number of wrong answers:</span>
              <span className="stat-right">{this.state.wrongAnswers}</span>
            </div>
            <section>
              <ul>
                <li>
                  <Link to="/">Back to Home</Link>
                </li>
              </ul>
            </section>
          </div>
        </>
      );
    } else {
      stats = (
        <section className="no-stats-container">
          <h1 className="no-stats">No Scores Available</h1>;
          <ul>
            <li>
              <Link to="/">Back to Home</Link>
            </li>
          </ul>
        </section>
      );
    }

    return (
      <>
        <div className="header">
          <h1 className="main-topic">Test</h1>
          <div className="scores">
            <button className="scoresBtn" onClick={this.handleOpenModal}>
              End Test{" "}
            </button>
            <ReactModal
              style={this.customStyles}
              ariaHideApp={false}
              isOpen={this.state.showModal}
              contentLabel="Example Modal"
              onRequestClose={this.handleCloseModal}
            >
              {stats}
            </ReactModal>
          </div>
        </div>
        <div className="questions">
          <div className="lifeline-container">
            <p>
              <MdOutlineQuiz
                className="lifeline"
                onClick={this.handleFiftyFifty}
              />
              <span>{fiftyFifty}</span>
            </p>
            <p>
              <HiLightBulb className="lifeline" onClick={this.handleHints} />
              <span>{hints}</span>
            </p>
          </div>
          <div className="timer-option">
            <p>
              <span>
                {currentQuestionIndex + 1} of {numberOfQuestions}
              </span>
              <span>
                <CiTimer />
                <span>
                  {time.minutes} : {time.seconds}
                </span>
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>

          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>

          <div className="button-container">
            <button
              id="prev"
              className="prev"
              onClick={this.handlePrevButtonClick}
            >
              Previous
            </button>

            <button
              id="next"
              className="next"
              onClick={this.handleNextButtonClick}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
