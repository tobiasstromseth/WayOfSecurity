// CardFactory.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNeo4j } from '../../../context/Neo4jContext';
import './Card.css';

const CardFactory = () => {
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  
  // Get the context value which contains both the driver and dbQueries
  const { dbQueries, isConnected, isInitializing, connectionError } = useNeo4j();

  // Fix: Added function keyword to make this a proper function
  const structureCardData = function(records) {
    // Structure the data in a more organized way
    let category = null;
    const question = {};
    const alternatives = [];
    
    records.forEach(record => {
      const data = record.toObject();
      
      // Set category info (only done once)
      if (!category) {
        category = {
          id: data.id,
          text: data.kategori_tekst,
          description: data.kategori_beskrivelse
        };
      }
      
      // Set question info (only done once)
      if (!question.text) {
        question.text = data.sporsmal_tekst;
      }
      
      // Add alternative if it doesn't already exist
      const altText = data.alternativ_tekst;
      if (!alternatives.some(alt => alt.text === altText)) {
        alternatives.push({
          text: altText,
          description: data.alternativ_beskrivelse,
          what: data.alternativ_hva,
          how: data.alternativ_hvordan
        });
      }
    });
    
    // Build the final card structure
    return {
      category: category,
      question: question,
      alternatives: alternatives
    };
  };
  
  // Use useCallback to avoid unnecessary re-renders
  const fetchData = useCallback(async () => {
    // Don't fetch again if we already have data
    if (dataFetched) return;
    
    console.log("Neo4j connection status:", { isInitializing, isConnected, connectionError });
    console.log("Context values:", { dbQueries: !!dbQueries });
    
    if (isInitializing) {
      console.log("Neo4j connection is initializing...");
      return;
    }
    
    if (!isConnected || connectionError) {
      setError(`Database connection error: ${connectionError}`);
      setLoading(false);
      return;
    }
    
    if (!dbQueries) {
      setError("Database queries object is not available");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Get all category IDs using the dbQueries from context
      console.log("Fetching category IDs...");
      const categoryIds = await dbQueries.getAllCategoryIds();
      console.log("Category IDs:", categoryIds);
      
      // Get card data for each category ID
      const fetchedCards = [];
      const fetchedCategories = [];
      
      // Process each category ID
      for (const categoryId of categoryIds) {
        try {
          // Get card data for this category ID
          console.log(`Fetching card data for category ID: ${categoryId}`);
          const cardsData = await dbQueries.getCardById(categoryId);
          
          // Fix: Use the structureCardData function to process the raw data
          const cardData = structureCardData(cardsData);
          
          if (cardData) {
            fetchedCards.push(cardData);
            
            // Use the category data from the structured response
            if (cardData.category) {
              fetchedCategories.push({
                id: cardData.category.id,
                name: cardData.category.text || `Category ${categoryId}`
              });
            } else {
              // Fallback for old data structure
              fetchedCategories.push({
                id: categoryId,
                name: `Category ${categoryId}`
              });
            }
          }
        } catch (cardError) {
          console.error(`Error fetching card for category ID ${categoryId}:`, cardError);
          // Continue with other categories even if one fails
        }
      }
      
      setCategories(fetchedCategories);
      setCards(fetchedCards);
      
      // Mark that we have fetched data
      setDataFetched(true);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [dbQueries, isConnected, isInitializing, connectionError, dataFetched]);
  
  // Run fetchData only when needed
  useEffect(() => {
    // Only run when dbQueries is available and we are connected
    if (dbQueries && isConnected && !isInitializing && !dataFetched) {
      fetchData();
    }
  }, [dbQueries, isConnected, isInitializing, fetchData, dataFetched]);
  
  // Add the ability to manually refresh data when needed
  const refreshData = () => {
    setDataFetched(false); // This will trigger a new fetchData()
  };
  
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Helper function to render text with fallback
  const renderText = (text, fallback = '') => {
    return text || fallback;
  };
  
  // Render a property with label
  const renderProperty = (label, value) => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    
    return (
      <div className="card-property">
        <strong>{label}:</strong>{' '}
        <span>{value}</span>
      </div>
    );
  };
  
  // Render a single alternative
  const renderAlternative = (alternative, index) => {
    return (
      <div key={index} className="alternative">
        <h5>Alternative {index + 1}: {renderText(alternative.text)}</h5>
        <div className="alternative-content">
          {renderProperty('Description', alternative.description)}
          {renderProperty('What to implement', alternative.what)}
          {renderProperty('How to implement', alternative.how)}
        </div>
      </div>
    );
  };
  
  // Render category information
  const renderCategory = (category) => {
    if (!category) return null;
    
    return (
      <div className="category-section">
        <h3>{renderText(category.text, 'Unnamed Category')}</h3>
        {renderProperty('Description', category.description)}
      </div>
    );
  };
  
  // Render question information
  const renderQuestion = (question) => {
    if (!question) return null;
    
    return (
      <div className="question-section">
        <h4>Question:</h4>
        <p>{renderText(question.text, 'No question text available')}</p>
      </div>
    );
  };
  
  // Render alternatives section
  const renderAlternatives = (alternatives) => {
    if (!alternatives || !Array.isArray(alternatives) || alternatives.length === 0) {
      return null;
    }
    
    return (
      <div className="alternatives-section">
        <h4>Alternatives:</h4>
        {alternatives.map((alternative, index) => 
          renderAlternative(alternative, index)
        )}
      </div>
    );
  };
  
  // Determine if card is using new structured format
  const isStructuredCard = (card) => {
    return card && card.category && card.question && card.alternatives;
  };
  
  // Handle legacy card format for backward compatibility
  const renderLegacyCard = (card) => {
    // Extract main properties and alternatives from flat structure
    const mainProperties = Object.keys(card).filter(key => 
      !key.startsWith('alternativ_') && key !== 'id'
    );
    
    // Extract alternatives from legacy format
    const alternatives = [];
    const alternativeKeys = Object.keys(card).filter(key => key.startsWith('alternativ_'));
    
    // Check if we have alternativ_tekst field
    if (card.alternativ_tekst) {
      // Handle array of alternatives
      if (Array.isArray(card.alternativ_tekst)) {
        card.alternativ_tekst.forEach((text, idx) => {
          const alternative = { tekst: text };
          
          alternativeKeys.forEach(key => {
            if (key !== 'alternativ_tekst' && Array.isArray(card[key]) && card[key][idx]) {
              alternative[key.replace('alternativ_', '')] = card[key][idx];
            }
          });
          
          alternatives.push(alternative);
        });
      } else {
        // Single alternative
        const alternative = { tekst: card.alternativ_tekst };
        
        alternativeKeys.forEach(key => {
          if (key !== 'alternativ_tekst') {
            alternative[key.replace('alternativ_', '')] = card[key];
          }
        });
        
        alternatives.push(alternative);
      }
    }
    
    return (
      <>
        <h3>{card.kategori_tekst || card.title || `Card ${card.id}`}</h3>
        
        {/* Main properties */}
        <div className="card-main-content">
          {mainProperties.map(key => {
            if (card[key] === null || card[key] === undefined) {
              return null;
            }
            
            return renderProperty(key, card[key]);
          })}
        </div>
        
        {/* Legacy alternatives section */}
        <div className="alternatives-section">
          <h4>Alternatives:</h4>
          {alternatives.map((alt, idx) => (
            <div key={idx} className="alternative">
              <h5>Alternative {idx + 1}: {alt.tekst}</h5>
              {Object.entries(alt).map(([key, value]) => {
                if (key !== 'tekst') {
                  return renderProperty(key, value);
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </>
    );
  };
  
  // Render a single card with all available information
  const renderCard = (card, index) => {
    return (
      <motion.div
        key={card.id || index}
        className="card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: index * 0.1 }}
        // Removed inline styles - now using CSS classes
      >
        {isStructuredCard(card) ? (
          // New structured card format
          <>
            {renderCategory(card.category)}
            {renderQuestion(card.question)}
            {renderAlternatives(card.alternatives)}
          </>
        ) : (
          // Legacy card format
          renderLegacyCard(card)
        )}
      </motion.div>
    );
  };
  
  return (
    <div className="card-factory">
      {loading ? (
        <div className="loading-container">
          <p>Loading data from Neo4j database...</p>
          {/* You could add a spinner here */}
        </div>
      ) : error ? (
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={refreshData} className="refresh-button">Try Again</button>
        </div>
      ) : cards.length > 0 ? (
        <div className="cards-container">
          <div className="cards-header">
            <h2>Cards by Category</h2>
            <button onClick={refreshData} className="refresh-button">Refresh Data</button>
          </div>
          
          <div className="categories-summary">
            <p>Found {categories.length} categories with {cards.length} cards</p>
          </div>
          
          <div className="cards-grid">
            {cards.map((card, index) => renderCard(card, index))}
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