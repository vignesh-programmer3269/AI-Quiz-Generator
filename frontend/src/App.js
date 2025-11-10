import { BrowserRouter, Routes, Route } from "react-router-dom";
import GenerateQuizPage from "./components/GenerateQuizPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import QuizHistoryPage from "./components/QuizHistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenerateQuizPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/quiz/:id/result" element={<ResultPage />} />
        <Route path="/quizzes-history" element={<QuizHistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
