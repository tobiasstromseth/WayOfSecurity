import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import Layout from './components/layout/Layout';
import StartPage from './components/home/StartPage';
import CategoryGrid from './components/assessment/CategoryGrid';
import ResultSummary from './components/results/ResultSummary';
import './index.css';

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/assessment" element={<CategoryGrid />} />
            <Route path="/results" element={<ResultSummary />} />
          </Routes>
        </Layout>
      </Router>
    </AssessmentProvider>
  );
}

export default App;