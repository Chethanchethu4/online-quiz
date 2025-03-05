import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../features/quizSlice";
import { useNavigate } from "react-router-dom";
import "../pages/QuizCreation.css";

const QuizCreationPage = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [error, setError] = useState(""); // Error message state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }
    if (options.some(option => option.trim() === "")) {
      setError("Please fill in all options.");
      return;
    }
    if (correctIndex === null) {
      setError("Please select the correct answer.");
      return;
    }

    dispatch(addQuestion({ question, options, correctIndex }));

    // Reset state
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(null);
    setError(""); // Clear error
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>Create Quiz</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          placeholder="Enter Question"
          className="input-field"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((option, index) => (
          <div key={index} className="option-container">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className="input-field"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && index < options.length - 1) {
                  document.getElementById(`option-${index + 1}`).focus();
                }
              }}
              id={`option-${index}`}
            />
            <input
              type="radio"
              name="correctAnswer"
              checked={correctIndex === index}
              onChange={() => setCorrectIndex(index)}
              className="radio-btn"
            />
          </div>
        ))}

        <button className="quiz-button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button className="start-button" onClick={() => navigate("/quiz")}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCreationPage;
