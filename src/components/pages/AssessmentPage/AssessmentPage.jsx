// src/components/pages/AssessmentPage/AssessmentPage.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentContext } from '../../../context/AssessmentContext';
import { categoryIcons } from '../../../data/categories';
import Header from '../../common/Header/Header';
import Background from '../../common/SpritesLoader/BackgroundSprites';
import { useCards } from '../../../context/CardContext';
import CardFactory from '../../common/Card/Card';
import ModalPortal from '../../common/ModalPortal/ModalPortal';
import './AssessmentPage.css';

// Generic CategoryDetail component without Neo4j references
const CategoryDetail = ({ 
  categoryData, 
  onClose, 
  answers,
  updateAnswer,
  completedCategories 
}) => {
  const [internalState, setInternalState] = useState({});
  const categoryId = categoryData.id?.toString();

  // Initialize internal state from answers
  React.useEffect(() => {
    if (categoryId && answers[categoryId]) {
      setInternalState(answers[categoryId]);
    }
  }, [categoryId, answers]);
  
  // Calculate status metrics
  const totalQuestions = categoryData.alternatives?.length || 0;
  const answeredQuestions = Object.keys(internalState).length;
  const isComplete = completedCategories.includes(categoryId);
  
  // Handle answer changes
  const handleAnswerChange = (questionId, value) => {
    // Update internal state
    setInternalState(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Update context state
    updateAnswer(categoryId, questionId, value);
  };
  
  const handleStopPropagation = (e) => {
    if (e) e.stopPropagation();
  };
  
  // Find appropriate icon
  const icon = categoryIcons[Object.keys(categoryIcons)[Math.floor(Math.random() * Object.keys(categoryIcons).length)]];

  return (
    <ModalPortal>
      <div className="modal-overlay" onClick={onClose}>
        <div className="detail-container" onClick={handleStopPropagation}>
          <div className="detail-header">
            <div className="header-content">
              {icon && <div className="icon-container-modal">{icon}</div>}
              <h2 className="modal-title">{categoryData.category?.text || "Unnamed Category"}</h2>
            </div>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          
          <p className="modal-description">{categoryData.category?.description || ""}</p>
          
          <div className="questions-container">
            <div className="questions-header">
              <h3 className="questions-title">Alternativer</h3>
              <div className="questions-status">
                {answeredQuestions} av {totalQuestions} besvart
              </div>
            </div>
            
            {categoryData.alternatives && categoryData.alternatives.length > 0 ? (
              categoryData.alternatives.map((alt, index) => {
                const questionId = `${categoryId}_q${index}`;
                return (
                  <div key={questionId} className="neo4j-question">
                    <div className="question-text">{alt.text || `Alternative ${index + 1}`}</div>
                    <div className="question-check">
                      <label className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={internalState[questionId] === true}
                          onChange={(e) => handleAnswerChange(questionId, e.target.checked)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    {alt.description && (
                      <div className="question-explanation">
                        <strong>Beskrivelse:</strong> {alt.description}
                      </div>
                    )}
                    {alt.what && (
                      <div className="question-what">
                        <strong>Hva:</strong> {alt.what}
                      </div>
                    )}
                    {alt.how && (
                      <div className="question-how">
                        <strong>Hvordan:</strong> {alt.how}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="no-questions-message">
                Ingen alternativer er tilgjengelig for denne kategorien ennå.
              </div>
            )}
          </div>
          
          <div className="close-button-container">
            <div className={`category-status ${isComplete ? 'complete' : ''}`}>
              {isComplete ? 'Kategori fullført' : `${answeredQuestions} av ${totalQuestions} alternativer besvart`}
            </div>
            <button className="action-button primary" onClick={onClose}>Lukk kategori</button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

// Main AssessmentPage component
const AssessmentPage = () => {
  const { 
    answers, 
    updateAnswer,
    completedCategories, 
    isAssessmentComplete,
    getCategoryStatus
  } = useContext(AssessmentContext);

  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const navigate = useNavigate();
  
  // Use CardContext for card count
  const { cards } = useCards();
  
  const handleCategoryClick = (card) => {
    setSelectedCategoryData(card);
  };
  
  const handleCloseDetail = () => {
    setSelectedCategoryData(null);
  };
  
  const handleNext = () => {
    navigate('/results');
  };
  
  // Calculate progress
  const totalCategories = cards.length;
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
          {/* Use the enhanced CardFactory with assessment mode */}
          <CardFactory 
            mode="assessment"
            onCardClick={handleCategoryClick}
            getCategoryStatus={getCategoryStatus}
            completedCategories={completedCategories}
          />
        </div>
             
        {selectedCategoryData && (
          <CategoryDetail 
            categoryData={selectedCategoryData}
            onClose={handleCloseDetail}
            answers={answers}
            updateAnswer={updateAnswer}
            completedCategories={completedCategories}
          />
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;