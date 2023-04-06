import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import Home from "./components/Home";
import Quizinstructions from "./components/quiz/Quizinstructions";
import Quiz from "./components/quiz/Quiz";
import QuizSummary from "./components/quiz/QuizSummary";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/quiz/instructions" exact element={<Quizinstructions />} />
        <Route path="/quiz" exact element={<Quiz />} />
        <Route path="/quiz/quizsummary" exact element={<QuizSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
