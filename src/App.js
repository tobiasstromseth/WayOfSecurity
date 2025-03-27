import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AssessmentProvider } from "./context/AssessmentContext";
import { Neo4jProvider } from "./context/Neo4jContext";
import { theme } from "./styles/theme";
import StartPage from "./components/pages/StartPage/StartPage";
import AssessmentPage from "./components/pages/AssessmentPage/AssessmentPage";
import ResultsPage from "./components/pages/ResultsPage/ResultsPage";
import DatabaseStatus from "./components/common/DatabaseStatus";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Neo4jProvider>
        <AssessmentProvider>
          <Router>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/assessment" element={<AssessmentPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
            <DatabaseStatus />
          </Router>
        </AssessmentProvider>
      </Neo4jProvider>
    </ThemeProvider>
  );
}

export default App;