import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuizzes } from "../../api/quizApi";
import "./index.css";

const QuizHistory = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="quiz-history-container">
      <button
        type="button"
        className="nav-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </button>
      <h2>Quiz History</h2>
      {quizzes.length === 0 ? (
        <p className="no-quizzes">No quizzes found.</p>
      ) : (
        <div className="quiz-list">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <h3>{quiz.title}</h3>
              <p className="date">
                Generated on: {new Date(quiz.date_generated).toLocaleString()}
              </p>
              <p className="url">
                Source: <br />
                <a href={quiz.url} target="_blank" rel="noopener noreferrer">
                  {quiz.url}
                </a>
              </p>
              <button
                className="view-quiz-btn"
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                View Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
