// src/components/common/Card/CardFactory.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCards } from '../../../context/CardContext';
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
   * Renders a complete card
   */
  static renderCard(card, index) {
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
}

/**
 * CardFactory component
 * Uses the CardContext to fetch and display cards
 */
const CardFactory = () => {
  const { cards, loading, error, fetchCards, resetFetchState } = useCards();
  
  // Manual data refresh
  const refreshData = () => {
    resetFetchState();
    fetchCards(true);
  };
  
  // Main render
  return (
    <div className="card-factory">
      {loading ? (
        <div className="loading-container">
          <p>Loading data from Neo4j database...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={refreshData} className="refresh-button">Try Again</button>
        </div>
      ) : cards.length > 0 ? (
        <div className="cards-container">
          <div className="cards-header">
            <h2>Cards</h2>
            <button onClick={refreshData} className="refresh-button">Refresh Data</button>
          </div>
          
          <div className="categories-summary">
            <p>Found {cards.length} cards</p>
          </div>
          
          <div className="cards-grid">
            {cards.map((card, index) => CardRenderer.renderCard(card, index))}
          </div>
        </div>
      ) : (
        <div className="empty-container">
          <p>No data found in the database</p>
          <button onClick={refreshData} className="refresh-button">Try Again</button>
        </div>
      )}
    </div>
  );
};

export default CardFactory;