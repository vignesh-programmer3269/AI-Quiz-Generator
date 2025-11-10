import React, { useState } from "react";
import { generateQuiz } from "../../api/quizApi";
import { useNavigate } from "react-router-dom";
import "./index.css";

const GenerateQuiz = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError("Please enter a Wikipedia URL");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const data = await generateQuiz(url);
      navigate(`/quiz/${data.quiz_id}`);
    } catch (err) {
      setError("Failed to generate quiz. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = () => {
    navigate("/quizzes-history");
  };

  return (
    <div className="generate-quiz-page">
      <div className="generate-container">
        <h2>AI Quiz Generator</h2>

        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          placeholder="Enter a Wikipedia URL"
          className="url-input"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="generate-btn"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
        <button onClick={handleViewHistory} className="history-btn">
          View History
        </button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default GenerateQuiz;
