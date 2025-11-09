import { useState } from "react";
import "./index.css";

const GenerateQuizPage = () => {
  const [url, setUrl] = useState("");
  const [quizLevel, setQuizLevel] = useState("Easy");
  const [noOfQuiz, setNoOfQuiz] = useState("5");

  const onChangeUrl = (event) => {
    setUrl(event.target.value);
  };

  const onChangeQuizLevel = (event) => {
    setQuizLevel(event.target.value);
  };

  const onChangesetNoOfQuiz = (event) => {
    setNoOfQuiz(event.target.value);
  };

  const generateQuiz = (event) => {
    event.preventDefault();
  };

  return (
    <div className="generate-quiz-page">
      <form className="generate-quiz-form" onSubmit={generateQuiz}>
        <input
          type="text"
          placeholder="Enter Wikipedia URL..."
          value={url}
          onChange={onChangeUrl}
          required
        />
        <div>
          <div>
            <div className="quiz-level-con">
              <label htmlFor="quizLevel">Quiz level: </label>
              <select
                id="quizLevel"
                value={quizLevel}
                onChange={onChangeQuizLevel}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="no-of-quiz-con">
              <label htmlFor="noOfQuiz">No of Quiz: </label>
              <select
                id="noOfQuiz"
                value={noOfQuiz}
                onChange={onChangesetNoOfQuiz}
              >
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="generate-quiz-btn"
          onClick={generateQuiz}
        >
          Generate Quiz
        </button>
      </form>
    </div>
  );
};

export default GenerateQuizPage;
