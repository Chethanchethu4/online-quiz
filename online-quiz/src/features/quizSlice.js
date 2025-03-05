import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  answers: [],
  score: 0, // Ensure score is in the initial state
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    submitAnswer: (state, action) => {
      state.answers = action.payload;

      // Calculate the score
      state.score = state.questions.reduce((acc, question, index) => {
        return acc + (question.correctIndex === state.answers[index] ? 1 : 0);
      }, 0);
    },
    resetQuiz: (state) => {
      state.answers = [];
      state.score = 0; // Reset the score
    },
  },
});

export const { addQuestion, submitAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
