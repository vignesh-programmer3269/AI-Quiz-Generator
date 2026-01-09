const API_BASE_URL = "http://localhost:8000";

export const generateQuiz = async (url) => {
  const response = await fetch(`${API_BASE_URL}/generate-quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to generate quiz");
  }

  return data;
};

export const fetchQuizById = async (quizId) => {
  const response = await fetch(`${API_BASE_URL}/quiz/${quizId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch quiz");
  }
  return response.json();
};

export const getAllQuizzes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/quizzes-history`);
    if (!response.ok) throw new Error("Failed to fetch quizzes");
    return await response.json();
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    throw err;
  }
};
