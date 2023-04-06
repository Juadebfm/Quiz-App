import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import Home from "./components/Home";
import Quizinstructions from "./components/quiz/Quizinstructions";
import Quiz from "./components/quiz/Quiz";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/quiz/instructions" exact element={<Quizinstructions />} />
        <Route path="/quiz" exact element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
