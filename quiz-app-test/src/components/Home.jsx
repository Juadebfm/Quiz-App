import React from "react";
import { Link } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";

const Home = () => {
  return (
    <>
      <div id="home-nav">
        <div>
          <h3>
            <HiAcademicCap className="icon" />
            <span>Quiz App</span>
          </h3>
        </div>

        <section>
          <div className="play-btn-container">
            <ul>
              <li>
                <Link to="/quiz/instructions" className="anchor">
                  Quiz Instructions
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="auth-container">
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/signup" className="signup">
              Signup
            </Link>
          </div> */}
        </section>
      </div>
      <div id="home"></div>
    </>
  );
};

export default Home;
