import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AssessmentContext } from '../../context/AssessmentContext';
import { recommendations, categories } from '../../data/categories';
import Recommendations from './Recommendations';
import Certificate from './Certificate';
import ProgressBar from '../assessment/ProgressBar';

const ResultSummary = () => {
  const { categories: assessmentCategories, overallScore } = useContext(AssessmentContext);
  const [showCertificate, setShowCertificate] = useState(false);
  
  // Generate recommendations based on scores
  const generateRecommendationsData = () => {
    const recommendationsData = [];
    
    Object.entries(assessmentCategories).forEach(([categoryId, categoryData]) => {
      if (categoryData.questionCompleted) {
        let priority;
        let recommendationText;
        
        if (categoryData.score < 40) {
          priority = 'high';
          recommendationText = recommendations[categoryId].low;
        } else if (categoryData.score < 70) {
          priority = 'medium';
          recommendationText = recommendations[categoryId].medium;
        } else {
          priority = 'low';
          recommendationText = recommendations[categoryId].high;
        }
        
        recommendationsData.push({
          id: categoryId,
          title: recommendations[categoryId].title,
          priority,
          text: recommendationText,
          score: categoryData.score
        });
      }
    });
    
    // Sort recommendations by priority (high, medium, low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return recommendationsData.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };
  
  const recommendationsData = generateRecommendationsData();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Your Security Assessment Results
        </h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Overall Security Score</h3>
          <ProgressBar percentage={overallScore} />
          
          <div className="mt-6 text-gray-700">
            <p className="mb-2">
              Based on your responses, we've identified the following recommendations 
              to improve your security posture. The recommendations are prioritized 
              with the most critical areas listed first.
            </p>
            
            <p>
              Take action on these recommendations to strengthen your 
              cybersecurity and better protect your business from threats.
            </p>
          </div>
        </div>
        
        <Recommendations recommendations={recommendationsData} />
        
        {!showCertificate && (
          <div className="mt-8 text-center">
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200"
              onClick={() => setShowCertificate(true)}
            >
              Generate Certificate
            </button>
          </div>
        )}
        
        {showCertificate && (
          <Certificate score={overallScore} date={new Date().toLocaleDateString()} />
        )}
        
        <div className="mt-8 flex justify-between">
          <Link
            to="/assessment"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200"
          >
            Back to Assessment
          </Link>
          
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;