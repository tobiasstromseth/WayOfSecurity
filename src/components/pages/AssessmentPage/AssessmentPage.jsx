// src/components/pages/AssessmentPage/AssessmentPage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentContext } from '../../../context/AssessmentContext';
import Header from '../../common/Header/Header';
import Background from '../../common/SpritesLoader/BackgroundSprites';
import CardFactory from '../../common/Card/Card';
import './AssessmentPage.css';

const AssessmentPage = () => {
  const { 
    answers, 
    updateAnswer,
    completedCategories, 
    isAssessmentComplete,
    getCategoryStatus
  } = useContext(AssessmentContext);

  const navigate = useNavigate();
  
  const handleNext = () => {
    navigate('/results');
  };
  
  // Calculate progress based on completed categories
  const totalCategories = completedCategories.length > 0 ? 
    (completedCategories.length / (isAssessmentComplete() ? 1 : 0.1)) : 0;
  const progress = Math.round((completedCategories.length / (totalCategories || 1)) * 100);
  
  return (
    <div className="page-container">
      <Background numberOfSprites={20} />
      
      <Header /> 
      <div className='content'>
        <div className="status-bar">
          <div>Kategorier gjennomført: {completedCategories.length}/{totalCategories || 0}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="button-container">
            <button 
              className={`action-button ${isAssessmentComplete() ? 'primary' : ''}`}
              onClick={handleNext}
              disabled={!isAssessmentComplete()}
            >
              {isAssessmentComplete() 
                ? "Se anbefalte tiltak" 
                : `Fullfør alle ${totalCategories} kategorier for å fortsette`}
            </button>
          </div>
        </div>
        
        <div className="categories-container">
          {/* Use the enhanced CardFactory with built-in modal functionality */}
          <CardFactory 
            mode="assessment"
            getCategoryStatus={getCategoryStatus}
            completedCategories={completedCategories}
            answers={answers}
            updateAnswer={updateAnswer}
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;