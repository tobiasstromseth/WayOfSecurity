// src/components/common/Card/Card.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCards } from '../../../context/CardContext';
import { categoryIcons } from '../../../data/categories';
import ModalPortal from '../ModalPortal/ModalPortal';
import './Card.css';

/**
 * CategoryDetail component
 * Displays detailed information about a category in a modal
 */
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
  useEffect(() => {
    if (categoryId && answers && answers[categoryId]) {
      setInternalState(answers[categoryId]);
    }
  }, [categoryId, answers]);
  
  // Calculate status metrics - moved before the useEffect that uses them
  const totalQuestions = categoryData.alternatives?.length || 0;
  const answeredQuestions = Object.keys(internalState).length;
  const isComplete = completedCategories ? completedCategories.includes(categoryId) : false;
  
  // For debugging
  useEffect(() => {
    console.log('CategoryDetail rendered with:', { 
      categoryId, 
      totalQuestions,
      answeredQuestions,
      alternatives: categoryData.alternatives?.length
    });
  }, [categoryId, categoryData, totalQuestions, answeredQuestions]);
  
  // Create default handlers if not provided
  const safeUpdateAnswer = (catId, qId, value) => {
    if (updateAnswer) {
      updateAnswer(catId, qId, value);
    } else {
      console.log('No updateAnswer function provided. Would update:', { catId, qId, value });
      // Update internal state regardless
      setInternalState(prev => ({
        ...prev,
        [qId]: value
      }));
    }
  };
  
  // Handle answer changes
  const handleAnswerChange = (questionId, value) => {
    console.log('Changing answer:', questionId, value);
    
    // Update internal state
    setInternalState(prev => {
      const newState = {
        ...prev,
        [questionId]: value
      };
      console.log('New internal state:', newState);
      return newState;
    });
    
    // Update context state using the safe function
    safeUpdateAnswer(categoryId, questionId, value);
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

/**
 * Card Renderer class
 * Handles rendering of card components
 */
class CardRenderer {
  /**
   * Renders text with fallback if empty
   */
  static renderText(text, fallback = '') {
    return text || fallback;
  }
  
  /**
   * Renders a property (label-value pair)
   */
  static renderProperty(label, value) {
    if (!value) return null;
    return (
      <div className="card-property">
        <strong>{label}:</strong>{' '}
        <span>{value}</span>
      </div>
    );
  }
  
  /**
   * Renders the category section
   */
  static renderCategorySection(category) {
    if (!category) return null;
    
    return (
      <div className="category-section">
        <h3>{CardRenderer.renderText(category.text, 'Unnamed Category')}</h3>
        {CardRenderer.renderProperty('Description', category.description)}
      </div>
    );
  }
  
  /**
   * Renders the points section
   */
  static renderPointsSection(points) {
    if (points === undefined || points === null) return null;
    
    let pointsClass = 'points-low';
    if (points >= 25) {
      pointsClass = 'points-high';
    } else if (points >= 15) {
      pointsClass = 'points-medium';
    }
    
    return (
      <div className={`points-section ${pointsClass}`}>
        <span className="points-label">Points:</span>
        <span className="points-value">{points}</span>
      </div>
    );
  }
  
  /**
   * Renders the question section
   */
  static renderQuestionSection(question) {
    if (!question) return null;
    
    return (
      <div className="question-section">
        <h4>Question:</h4>
        <p>{CardRenderer.renderText(question.text, 'No question text available')}</p>
      </div>
    );
  }
  
  /**
   * Renders the alternatives section
   */
  static renderAlternativesSection(alternatives) {
    if (!alternatives || alternatives.length === 0) return null;
    
    return (
      <div className="alternatives-section">
        <h4>Alternatives:</h4>
        {alternatives.map((alt, idx) => (
          <div key={idx} className="alternative">
            <h5>Alternative {idx + 1}: {CardRenderer.renderText(alt.text)}</h5>
            <div className="alternative-content">
              {CardRenderer.renderProperty('Description', alt.description)}
              {CardRenderer.renderProperty('What to implement', alt.what)}
              {CardRenderer.renderProperty('How to implement', alt.how)}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  /**
   * Renders a standard detailed card
   */
  static renderStandardCard(card, index) {
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };
    
    return (
      <motion.div
        key={card.id || index}
        className="card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <div className="card-header">
          {card.id !== null && <div className="card-id">ID: {card.id}</div>}
          {CardRenderer.renderPointsSection(card.points)}
        </div>
        {CardRenderer.renderCategorySection(card.category)}
        {CardRenderer.renderQuestionSection(card.question)}
        {CardRenderer.renderAlternativesSection(card.alternatives)}
      </motion.div>
    );
  }
  
  /**
   * Renders an assessment-style card
   */
  static renderAssessmentCard(card, index, options = {}) {
    const { 
      onCardClick,
      getCategoryStatus,
      completedCategories = [],
      cardColors = ['var(--blue)', 'var(--purple)']
    } = options;
    
    const categoryId = card.id?.toString();
    const status = getCategoryStatus ? 
      getCategoryStatus(categoryId) : 
      { answered: 0, total: card.alternatives?.length || 0 };
    const isComplete = completedCategories.includes(categoryId);
    const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];
    
    return (
      <motion.div
        key={categoryId || index}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <div 
          className="category-card" 
          onClick={() => onCardClick && onCardClick(card)}
          style={{ backgroundColor: randomColor }}
        >
          <div className="icon-container">
            {categoryIcons[Object.keys(categoryIcons)[index % Object.keys(categoryIcons).length]]}
          </div>
          <h3 className="category-title">{card.category?.text || "Unnamed Category"}</h3>
          <p className="category-description">
            {card.category?.description || "No description available"}
          </p>
          {status && (
            <div className={`status-indicator ${isComplete ? 'complete' : ''}`}>
              {status.answered}/{status.total} besvart
            </div>
          )}
        </div>
      </motion.div>
    );
  }
}

/**
 * CardFactory component
 * Uses the CardContext to fetch and display cards
 * 
 * @param {Object} props
 * @param {string} props.mode - 'standard', 'assessment', or 'results'
 * @param {Function} props.onCardClick - Called when a card is clicked (assessment mode)
 * @param {Function} props.getCategoryStatus - Function to get status for a category (assessment mode)
 * @param {Array} props.completedCategories - List of completed category IDs (assessment mode)
 * @param {Object} props.answers - Current answers state (for CategoryDetail modal)
 * @param {Function} props.updateAnswer - Function to update answers (for CategoryDetail modal)
 */
const CardFactory = ({ 
  mode = 'standard', // 'standard', 'assessment', or 'results'
  onCardClick,
  getCategoryStatus,
  completedCategories,
  answers = {},
  updateAnswer,
  className = ''
}) => {
  const { cards, loading, error, fetchCards, resetFetchState } = useCards();
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [internalAnswers, setInternalAnswers] = useState({});
  
  // If no external getCategoryStatus is provided, create a default one
  const defaultGetCategoryStatus = (categoryId) => {
    const card = cards.find(c => c.id?.toString() === categoryId);
    if (!card) return { total: 0, answered: 0, fulfilled: 0 };
    
    const alternatives = card.alternatives || [];
    const categoryAnswers = answers[categoryId] || internalAnswers[categoryId] || {};
    const answeredQuestions = Object.keys(categoryAnswers).length;
    
    return {
      total: alternatives.length,
      answered: answeredQuestions,
      fulfilled: answeredQuestions
    };
  };
  
  // Use provided getCategoryStatus or fallback to default
  const getStatusFn = getCategoryStatus || defaultGetCategoryStatus;
  
  // Internal update answer function if none is provided
  const internalUpdateAnswer = (categoryId, questionId, value) => {
    console.log('Internal update:', categoryId, questionId, value);
    setInternalAnswers(prev => ({
      ...prev,
      [categoryId]: {
        ...(prev[categoryId] || {}),
        [questionId]: value
      }
    }));
  };
  
  // Calculate internal completed categories if none provided
  const internalCompletedCategories = Object.keys(internalAnswers).filter(categoryId => {
    const card = cards.find(c => c.id?.toString() === categoryId);
    if (!card) return false;
    
    const totalAlternatives = card.alternatives?.length || 0;
    const answeredQuestions = Object.keys(internalAnswers[categoryId] || {}).length;
    
    return answeredQuestions === totalAlternatives;
  });

  // Custom card click handler that opens the modal
  const handleCardClick = (card) => {
    // Always open the modal in assessment or results mode
    if (mode === 'assessment' || mode === 'results') {
      setSelectedCategoryData(card);
    }
    
    // Also call the parent's handler if provided (for backward compatibility)
    if (onCardClick) {
      onCardClick(card);
    }
  };
  
  // Close modal handler
  const handleCloseDetail = () => {
    setSelectedCategoryData(null);
  };

  // Manual data refresh
  const refreshData = () => {
    resetFetchState();
    fetchCards(true);
  };

  // Determine the container class based on mode
  const containerClass = mode === 'assessment' ? 'categories-grid' : 'cards-grid';
  
  // Main render
  return (
    <div className={`card-factory ${className}`}>
      {loading ? (
        <div className="loading-container">
          <p>{mode === 'assessment' ? 'Laster kategorier...' : 'Loading data from database...'}</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={refreshData} className="refresh-button">
            {mode === 'assessment' ? 'Prøv igjen' : 'Try Again'}
          </button>
        </div>
      ) : cards.length > 0 ? (
        <>
          {mode === 'standard' && (
            <div className="cards-header">
              <h2>Cards</h2>
              <button onClick={refreshData} className="refresh-button">Refresh Data</button>
            </div>
          )}
          
          {mode === 'standard' && (
            <div className="categories-summary">
              <p>Found {cards.length} cards</p>
            </div>
          )}
          
          <div className={containerClass}>
            {cards.map((card, index) => 
              mode === 'assessment' 
                ? CardRenderer.renderAssessmentCard(card, index, {
                    onCardClick: () => handleCardClick(card),
                    getCategoryStatus: getStatusFn,
                    completedCategories: completedCategories || []
                  }) 
                : CardRenderer.renderStandardCard(card, index)
            )}
          </div>
          
          {/* Category Detail Modal */}
          <AnimatePresence>
            {selectedCategoryData && (mode === 'assessment' || mode === 'results') && (
              <CategoryDetail 
                categoryData={selectedCategoryData}
                onClose={handleCloseDetail}
                answers={answers || internalAnswers}
                updateAnswer={updateAnswer || internalUpdateAnswer}
                completedCategories={completedCategories || internalCompletedCategories || []}
                mode={mode}
              />
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="empty-container">
          <p>{mode === 'assessment' ? 'Ingen kategorier funnet.' : 'No data found in the database'}</p>
          <button onClick={refreshData} className="refresh-button">
            {mode === 'assessment' ? 'Prøv igjen' : 'Try Again'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CardFactory;