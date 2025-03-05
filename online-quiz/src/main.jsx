import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store";
import LoginPage from "./pages/LoginPage";
import QuizCreationPage from "./pages/QuizCreationPage";
import QuizPage from "./pages/QuizTakingPage";
import ResultsPage from "./pages/ResultsPage";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-quiz" element={<QuizCreationPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
