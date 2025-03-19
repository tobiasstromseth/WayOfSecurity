import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AssessmentProvider } from "./context/AssessmentContext";
import StartPage from "./components/pages/StartPage";
import AssessmentPage from "./components/pages/AssessmentPage";
import ResultsPage from "./components/pages/ResultsPage";
import "./styles/global.css";

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </AssessmentProvider>
  );
}

export default App;
