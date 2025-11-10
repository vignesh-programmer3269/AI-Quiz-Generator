import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!state) {
    return (
      <div className="quiz-error">
        <p>No quiz data found. </p>
        <button className="nav-btn" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const { quizData, userAnswers, score } = state;
  const total = quizData.questions.length;

  let message = "";
  const percent = (score / total) * 100;
  if (percent === 100) message = "🏆 Perfect! You nailed it!";
  else if (percent >= 80) message = "🎯 Excellent work!";
  else if (percent >= 50) message = "👍 Good effort!";
  else message = "Keep practicing and try again! 💪";

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Result</h1>

      <div className="score-section">
        <h2>
          Your Score: {score} / {total}
        </h2>
        <p className="greet-message">{message}</p>
      </div>

      <h2 className="quiz-summary">{quizData.title}</h2>
      <p className="summary-text">{quizData.summary}</p>

      <div className="result-questions">
        {quizData.questions.map((q) => {
          const userAnswer = userAnswers[q.question_no];
          const selectedKey = userAnswer?.selected;
          const correctKey = q.answer;

          return (
            <div key={q.question_no} className="result-question-card">
              <h3>
                {q.question_no}. {q.question}
              </h3>
              <ul>
                {Object.entries(q.options).map(([key, value]) => {
                  const isSelected = selectedKey === key;
                  const isCorrect = key === correctKey;

                  let liClass = "";
                  if (isCorrect) liClass = "correct";
                  else if (isSelected && !isCorrect) liClass = "incorrect";

                  return (
                    <li key={key} className={liClass}>
                      <strong>{key}.</strong> {value}
                      {isSelected && !isCorrect && (
                        <span className="user-choice">(Your choice)</span>
                      )}
                      {isCorrect && (
                        <span className="correct-choice">(Correct)</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <button className="nav-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
      <button className="nav-btn" onClick={() => navigate(`/quiz/${id}`)}>
        Try Again
      </button>
    </div>
  );
};

export default ResultPage;
