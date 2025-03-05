import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitAnswer } from "../features/quizSlice";
import { useNavigate } from "react-router-dom";
import "../pages/QuizTaking.css";

const QuizTakingPage = () => {
  const questions = useSelector((state) => state.quiz.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Effect to handle timer countdown
  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, [timeLeft]);

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(10); // Reset timer for next question
    } else {
      handleSubmit(); // Submit quiz if last question
    }
  };

  const handleSubmit = () => {
    dispatch(submitAnswer(answers));
    navigate("/results");
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2 className="quiz-title">Take the Quiz</h2>
        <div className="question-block">
          <h3 className="question">{currentIndex + 1}. {questions[currentIndex].question}</h3>
          <div className="options-grid">
            {questions[currentIndex].options.map((option, oIndex) => (
              <div key={oIndex} className="option-item">
                <input
                  type="radio"
                  id={`q${currentIndex}-opt${oIndex}`}
                  name={`question-${currentIndex}`}
                  checked={answers[currentIndex] === oIndex}
                  onChange={() =>
                    setAnswers(answers.map((a, i) => (i === currentIndex ? oIndex : a)))
                  }
                />
                <label htmlFor={`q${currentIndex}-opt${oIndex}`} className="option-label">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="timer">Time Left: {timeLeft}s</div>

        {/* Buttons */}
        {currentIndex < questions.length - 1 ? (
          <button className="next-btn" onClick={nextQuestion}>Next Question</button>
        ) : (
          <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
        )}
      </div>
    </div>
  );
};

export default QuizTakingPage;
