import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../features/quizSlice";
import { useNavigate } from "react-router-dom";
import "../pages/Results.css";

const ResultsPage = () => {
  const score = useSelector((state) => state.quiz.score);
  const totalQuestions = useSelector((state) => state.quiz.questions.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate("/quiz");
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>Quiz Results</h2>
        {totalQuestions > 0 ? (
          <>
            <p>Your Score: <strong>{score} / {totalQuestions}</strong></p>
            <button className="restart-btn" onClick={handleRestart}>
              Restart Quiz
            </button>
          </>
        ) : (
          <p>No quiz data available.</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
