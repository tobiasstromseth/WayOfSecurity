// src/context/CardContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNeo4j } from './Neo4jContext';

// Create context
export const CardContext = createContext();

// Custom hook to use the card context
export const useCards = () => useContext(CardContext);

/**
 * Helper for extracting numeric ID from Neo4j Integer objects
 */
const extractNumericId = (id) => {
  if (id && typeof id === 'object' && 'low' in id) {
    return id.low;
  }
  return parseInt(id);
};

/**
 * Category model
 */
class Category {
  constructor(data) {
    this.id = extractNumericId(data.id);
    this.text = data.text || '';
    this.description = data.description || '';
  }
}

/**
 * Question model
 */
class Question {
  constructor(data) {
    this.text = data.text || '';
  }
}

/**
 * Alternative model
 */
class Alternative {
  constructor(data) {
    this.text = data.text || '';
    this.description = data.description || '';
    this.what = data.what || '';
    this.how = data.how || '';
  }
}

/**
 * Card model - Main data container
 */
class Card {
  constructor(data) {
    this.id = data.category ? data.category.id : null;
    this.category = data.category || null;
    this.question = data.question || null;
    this.alternatives = data.alternatives || [];
    this.points = data.points || 0;
  }

  /**
   * Create a card from Neo4j records
   */
  static fromRecords(records) {
    if (!records || records.length === 0) return null;
    
    // Extract initial category data from first record
    const firstRecord = records[0].toObject();
    
    // Create category from first record
    const category = new Category({
      id: firstRecord.id,
      text: firstRecord.kategori_tekst,
      description: firstRecord.kategori_beskrivelse
    });
    
    // Create question from first record
    const question = new Question({
      text: firstRecord.sporsmal_tekst
    });
    
    // Collect alternatives from all records
    const alternativesMap = new Map();
    
    records.forEach(record => {
      const data = record.toObject();
      const altText = data.alternativ_tekst;
      
      if (altText && !alternativesMap.has(altText)) {
        alternativesMap.set(altText, new Alternative({
          text: altText,
          description: data.alternativ_beskrivelse,
          what: data.alternativ_hva,
          how: data.alternativ_hvordan
        }));
      }
    });
    
    const alternatives = Array.from(alternativesMap.values());
    
    // Create and return the card
    return new Card({ category, question, alternatives });
  }
}

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  
  const { dbQueries, isConnected, isInitializing, connectionError } = useNeo4j();
  
  // Calculate points based on card ID
  const calculatePoints = (cardId, minId, maxId) => {
    // If there's only one card or invalid IDs
    if (minId === maxId || cardId === undefined || minId === undefined || maxId === undefined) {
      return 33; // Default to max points
    }
    
    // Normalize the ID (0 to 1 range, where 0 = minId and 1 = maxId)
    const normalizedId = (cardId - minId) / (maxId - minId);
    
    // Non-linear distribution
    const pointsValue = 33 - (normalizedId * normalizedId * 25);
    
    // Round to nearest integer
    return Math.round(pointsValue);
  };

  // Fetch data from Neo4j database
  const fetchCards = useCallback(async (forceRefresh = false) => {
    if (isInitializing) return { cards: [], loading: true, error: null };
    
    // Return cached data if already fetched and not forcing refresh
    if (isDataFetched && !forceRefresh) {
      return { cards, loading: false, error: null };
    }
    
    if (!isConnected || connectionError) {
      const errorMsg = `Database connection error: ${connectionError}`;
      setError(errorMsg);
      setLoading(false);
      return { cards: [], loading: false, error: errorMsg };
    }
    
    if (!dbQueries) {
      const errorMsg = "Database queries are not available";
      setError(errorMsg);
      setLoading(false);
      return { cards: [], loading: false, error: errorMsg };
    }
    
    try {
      setLoading(true);
      
      // Get all category IDs
      const categoryIds = await dbQueries.getAllCategoryIds();
      
      const fetchedCards = [];
      
      // Process each category ID
      for (const categoryId of categoryIds) {
        try {
          const cardsData = await dbQueries.getCardById(categoryId);
          const card = Card.fromRecords(cardsData);
          
          if (card) {
            fetchedCards.push(card);
          }
        } catch (error) {
          console.error(`Error fetching card for category ID ${categoryId}:`, error);
        }
      }
      
      // Find min and max IDs for point calculation
      const cardIds = fetchedCards.map(card => card.id).filter(id => id !== null && !isNaN(id));
      
      let minId = 0;
      let maxId = 0;
      
      if (cardIds.length > 0) {
        minId = Math.min(...cardIds);
        if (minId < 0) {
          minId = 0;
        }
        maxId = Math.max(...cardIds);
      }
      
      // Calculate points for each card
      fetchedCards.forEach(card => {
        if (card.id !== null) {
          card.points = calculatePoints(card.id, minId, maxId);
        }
      });
      
      setCards(fetchedCards);
      setIsDataFetched(true);
      setError(null);
      
      return { cards: fetchedCards, loading: false, error: null };
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      return { cards: [], loading: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [cards, dbQueries, isConnected, isInitializing, connectionError, isDataFetched]);
  
  // Initial data fetch
  useEffect(() => {
    if (dbQueries && isConnected && !isInitializing && !isDataFetched) {
      fetchCards();
    }
  }, [dbQueries, isConnected, isInitializing, isDataFetched, fetchCards]);
  
  // Get a specific card by ID
  const getCardById = useCallback((cardId) => {
    return cards.find(card => card.id === cardId || card.id === parseInt(cardId));
  }, [cards]);
  
  // Reset the data fetch state (for forcing a refresh)
  const resetFetchState = useCallback(() => {
    setIsDataFetched(false);
  }, []);
  
  const value = {
    cards,
    loading,
    error,
    fetchCards,
    getCardById,
    resetFetchState
  };
  
  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
};