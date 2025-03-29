// src/components/pages/AssessmentPage/AssessmentPage.jsx
import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AssessmentContext } from '../../../context/AssessmentContext';
import { categoryIcons } from '../../../data/categories';
import Header from '../../common/Header/Header';
import Background from '../../common/SpritesLoader/BackgroundSprites';
import { useCards } from '../../../context/CardContext';
import './AssessmentPage.css';
import ModalPortal from '../../common/ModalPortal/ModalPortal';

// Custom Neo4j-compatible CategoryDetail component 
const Neo4jCategoryDetail = ({ 
  categoryData, 
  onClose, 
  standalone = false,
  answers,
  updateAnswer,
  completedCategories 
}) => {
  const [internalState, setInternalState] = useState({});

  // Get category info from the card data
  const categoryId = categoryData.id?.toString();
  const categoryName = categoryData.category?.text || 'Unnamed Category';
  const categoryDescription = categoryData.category?.description || '';
  
  // Extract questions from Neo4j data
  const questions = categoryData.alternatives?.map((alt, index) => ({
    id: `${categoryId}_q${index}`,
    categoryId: categoryId,
    text: alt.text || `Question ${index + 1}`,
    standard: 'Neo4j Standard',
    explanation: alt.description || 'No explanation available',
    what: alt.what || '',
    how: alt.how || ''
  })) || [];
  
  // Initialize internal state from answers
  useEffect(() => {
    if (categoryId && answers[categoryId]) {
      setInternalState(answers[categoryId]);
    }
  }, [categoryId, answers]);
  
  // Calculate status metrics
  const totalQuestions = questions.length;
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
              <h2 className="modal-title">{categoryName}</h2>
            </div>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          
          <p className="modal-description">{categoryDescription}</p>
          
          <div className="questions-container">
            <div className="questions-header">
              <h3 className="questions-title">Alternativer</h3>
              <div className="questions-status">
                {answeredQuestions} av {totalQuestions} besvart
              </div>
            </div>
            
            {questions.length > 0 ? (
              questions.map(question => (
                <div key={question.id} className="neo4j-question">
                  <div className="question-text">{question.text}</div>
                  <div className="question-check">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={internalState[question.id] === true}
                        onChange={(e) => handleAnswerChange(question.id, e.target.checked)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  {question.explanation && (
                    <div className="question-explanation">
                      <strong>Beskrivelse:</strong> {question.explanation}
                    </div>
                  )}
                  {question.what && (
                    <div className="question-what">
                      <strong>Hva:</strong> {question.what}
                    </div>
                  )}
                  {question.how && (
                    <div className="question-how">
                      <strong>Hvordan:</strong> {question.how}
                    </div>
                  )}
                </div>
              ))
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
    securityScore, 
    completedCategories, 
    isAssessmentComplete,
    getCategoryStatus
  } = useContext(AssessmentContext);

  const cardColors = [
    'var(--blue)',
    'var(--purple)',
  ];
  
  // Function to select a random color
  const getRandomColor = () => {
    return cardColors[Math.floor(Math.random() * cardColors.length)];
  };
  
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const cardsRef = useRef([]);
  const navigate = useNavigate();
  
  // Use the CardContext instead of direct Neo4j queries
  const { cards, loading, error, fetchCards } = useCards();
  
  // Calculate rows for layout when cards change
  useEffect(() => {
    const calculateRows = () => {
      if (!cardsRef.current.length) return;
      
      const cardElements = cardsRef.current.filter(ref => ref);
      if (!cardElements.length) return;
      
      let currentRowTop = cardElements[0]?.getBoundingClientRect().top;
      let rows = [];
      let currentRow = [];
      
      cardElements.forEach((card, index) => {
        const { top } = card.getBoundingClientRect();
        
        if (Math.abs(top - currentRowTop) > 10) {
          rows.push([...currentRow]);
          currentRow = [index];
          currentRowTop = top;
        } else {
          currentRow.push(index);
        }
      });
      
      if (currentRow.length) {
        rows.push([...currentRow]);
      }
      
      const newVisibleRows = rows.slice(0, -1).map(row => row[row.length - 1]);
      setVisibleRows(newVisibleRows);
    };
    
    calculateRows();
    window.addEventListener('resize', calculateRows);
    
    return () => {
      window.removeEventListener('resize', calculateRows);
    };
  }, [cards.length]);
  
  // Update cardRefs when cards change
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, cards.length);
  }, [cards.length]);
  
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
  
  // Render content based on loading/error/data state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <p>Laster data fra Neo4j databasen...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="error-container">
          <p>Feil: {error}</p>
          <button onClick={() => fetchCards(true)} className="refresh-button">Prøv igjen</button>
        </div>
      );
    }
    
    if (cards.length === 0) {
      return (
        <div className="empty-container">
          <p>Ingen kategorier funnet. Vennligst sjekk databasetilkoblingen.</p>
          <button onClick={() => fetchCards(true)} className="refresh-button">Prøv igjen</button>
        </div>
      );
    }
    
    // Return the cards grid with data from CardContext
    return (
      <div className="categories-grid">
        {cards.map((card, index) => {
          const categoryId = card.id?.toString();
          const status = getCategoryStatus(categoryId) || { answered: 0, total: card.alternatives?.length || 0 };
          const isComplete = completedCategories.includes(categoryId);
          const shouldShowDivider = visibleRows.includes(index);
          const randomColor = getRandomColor();
          
          return (
            <React.Fragment key={categoryId || index}>
              <motion.div
                ref={el => cardsRef.current[index] = el}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div 
                  className="category-card" 
                  onClick={() => handleCategoryClick(card)}
                  style={{ backgroundColor: randomColor }}
                >
                  <div className="icon-container">
                    {categoryIcons[Object.keys(categoryIcons)[index % Object.keys(categoryIcons).length]]}
                  </div>
                  <h3 className="category-title">{card.category?.text || "Unnamed Category"}</h3>
                  <p className="category-description">
                    {card.category?.description || "No description available"}
                  </p>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  
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
          {renderContent()}
        </div>
             
        {selectedCategoryData && (
          <Neo4jCategoryDetail 
            categoryData={selectedCategoryData}
            onClose={handleCloseDetail}
            standalone={true}
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