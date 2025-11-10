import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:8000/quiz/${id}`);
        const data = await res.json();
        setQuizData(data);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswer = (optionKey) => {
    const currentQ = quizData.questions[currentIndex];

    // Prevent re-answering
    if (userAnswers[currentQ.question_no]) return;

    const isCorrect = optionKey === currentQ.answer;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.question_no]: {
        selected: optionKey,
        isCorrect,
      },
    }));

    if (isCorrect) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIndex < quizData.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Redirect to Result Page
      navigate(`/quiz/${id}/result`, {
        state: { quizData, userAnswers, score },
      });
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) return <div className="quiz-loading">Loading quiz...</div>;
  if (!quizData) return <div className="quiz-error">Failed to load quiz.</div>;

  const currentQ = quizData.questions[currentIndex];
  const userAnswer = userAnswers[currentQ.question_no];

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quizData.title}</h1>

      <div className="question-section">
        <h3 className="question-number">
          Question {currentQ.question_no} / {quizData.questions.length}
        </h3>
        <p className="question-text">{currentQ.question}</p>

        <div className="options-container">
          {Object.entries(currentQ.options).map(([key, value]) => {
            const isSelected = userAnswer?.selected === key;
            const isCorrect = userAnswer && key === currentQ.answer;

            let optionClass = "option-btn";
            if (userAnswer) {
              if (isSelected) {
                optionClass += userAnswer.isCorrect ? " correct" : " incorrect";
              }
              if (isCorrect && !userAnswer.isCorrect) {
                optionClass += " correct";
              }
            }

            return (
              <button
                key={key}
                className={optionClass}
                onClick={() => handleAnswer(key)}
                disabled={!!userAnswer}
              >
                <strong>{key}.</strong> {value}
              </button>
            );
          })}
        </div>
      </div>

      <div className="nav-buttons">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="nav-btn"
        >
          Previous
        </button>
        <button onClick={nextQuestion} className="nav-btn">
          {currentIndex === quizData.questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      <div className="quiz-progress">
        Score: {score} / {quizData.questions.length}
      </div>
    </div>
  );
};

export default QuizPage;
