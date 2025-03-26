import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AssessmentProvider } from "./context/AssessmentContext";
import { theme } from "./styles/theme";
import StartPage from "./components/pages/StartPage/StartPage";
import AssessmentPage from "./components/pages/AssessmentPage/AssessmentPage";
import ResultsPage from "./components/pages/ResultsPage/ResultsPage";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AssessmentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </Router>
      </AssessmentProvider>
    </ThemeProvider>
  );
}

export default App;