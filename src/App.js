// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AssessmentProvider } from "./context/AssessmentContext";
import { Neo4jProvider } from "./context/Neo4jContext";
import { CardProvider } from "./context/CardContext";
import { theme } from "./styles/theme";
import StartPage from "./components/pages/StartPage/StartPage";
import AssessmentPage from "./components/pages/AssessmentPage/AssessmentPage";
import ResultsPage from "./components/pages/ResultsPage/ResultsPage";
import TestCards from "./components/pages/TestCards/TestCards";
import DatabaseStatus from "./components/common/DatabaseStatus/DatabaseStatus";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Neo4jProvider>
        <CardProvider>
          <AssessmentProvider>
            <Router>
              <Routes>
                <Route path="/" element={<TestCards />} />
                <Route path="/assessment" element={<AssessmentPage />} />
                <Route path="/results" element={<ResultsPage />} />
              </Routes>
              <DatabaseStatus />
            </Router>
          </AssessmentProvider>
        </CardProvider>
      </Neo4jProvider>
    </ThemeProvider>
  );
}

export default App;