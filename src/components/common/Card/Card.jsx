// src/components/common/Card/CardFactory.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCards } from '../../../context/CardContext';
import { categoryIcons } from '../../../data/categories';
import './Card.css';

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
            <div className="status-indicator">
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
 * @param {string} props.mode - 'standard' or 'assessment'
 * @param {Function} props.onCardClick - Called when a card is clicked (assessment mode)
 * @param {Function} props.getCategoryStatus - Function to get status for a category (assessment mode)
 * @param {Array} props.completedCategories - List of completed category IDs (assessment mode)
 */
const CardFactory = ({ 
  mode = 'standard',
  onCardClick,
  getCategoryStatus,
  completedCategories,
  className = ''
}) => {
  const { cards, loading, error, fetchCards, resetFetchState } = useCards();
  
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
                    onCardClick,
                    getCategoryStatus,
                    completedCategories
                  }) 
                : CardRenderer.renderStandardCard(card, index)
            )}
          </div>
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