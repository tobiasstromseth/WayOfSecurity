// CardFactory.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNeo4j } from '../../../context/Neo4jContext';
import './Card.css';

/**
 * DATAMODELL OVERSIKT
 * 
 * Kort (Card):
 * - id: Numerisk ID (samme som kategori-ID)
 * - category: Kategori-objekt med:
 *   - id: Numerisk ID
 *   - text: Kategoriens navn/tekst
 *   - description: Kategoriens beskrivelse
 * - question: Spørsmål-objekt med:
 *   - text: Spørsmålstekst
 * - alternatives: Liste av Alternativ-objekter, hvor hvert har:
 *   - text: Alternativets tekst
 *   - description: Alternativets beskrivelse
 *   - what: "Hva" informasjon om alternativet
 *   - how: "Hvordan" informasjon om alternativet
 * - points: Poengverdi for kortet
 */

// ------------------------------
// HJELPEFUNKSJONER
// ------------------------------

/**
 * Hjelper for å trekke ut numerisk ID fra Neo4j Integer-objekter
 */
const extractNumericId = (id) => {
  if (id && typeof id === 'object' && 'low' in id) {
    return id.low;
  }
  return parseInt(id);
};

// ------------------------------
// DATAMODELLER
// ------------------------------

/**
 * Kategori-modell
 * Inneholder:
 * - id: Numerisk ID
 * - text: Kategoriens tekst/navn
 * - description: Kategoriens beskrivelse
 */
class Category {
  constructor(data) {
    this.id = extractNumericId(data.id);
    this.text = data.text || '';
    this.description = data.description || '';
  }
}

/**
 * Spørsmål-modell
 * Inneholder:
 * - text: Spørsmålstekst
 */
class Question {
  constructor(data) {
    this.text = data.text || '';
  }
}

/**
 * Alternativ-modell
 * Inneholder:
 * - text: Alternativets tekst
 * - description: Alternativets beskrivelse
 * - what: "Hva" informasjon for implementering
 * - how: "Hvordan" informasjon for implementering
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
 * Kort-modell - Hoved datacontainer
 * Inneholder:
 * - id: Kortets ID (samme som kategori-ID)
 * - category: Kategori-objekt
 * - question: Spørsmål-objekt
 * - alternatives: Liste av alternativer
 * - points: Beregnet poengverdi
 */
class Card {
  constructor(data) {
    // The card ID is the same as the category ID
    this.id = data.category ? data.category.id : null;
    this.category = data.category || null;
    this.question = data.question || null;
    this.alternatives = data.alternatives || [];
    this.points = data.points || 0;
  }

  /**
   * Oppretter et kort fra Neo4j-records
   * @param {Array} records - Data fra Neo4j-spørringer
   * @returns {Card|null} - Nytt kort-objekt eller null
   */
  static fromRecords(records) {
    if (!records || records.length === 0) return null;
    
    // Extract initial category data from first record
    const firstRecord = records[0].toObject();
    
    // Opprett kategori fra første record
    const category = new Category({
      id: firstRecord.id,
      text: firstRecord.kategori_tekst,
      description: firstRecord.kategori_beskrivelse
    });
    
    // Opprett spørsmål fra første record
    const question = new Question({
      text: firstRecord.sporsmal_tekst
    });
    
    // Samle alternativer fra alle records
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
    
    // Opprett og returner kortet
    return new Card({ category, question, alternatives });
  }
}

// ------------------------------
// DATATJENESTER
// ------------------------------

/**
 * Kortdatatjeneste
 * Håndterer henting og behandling av kortdata
 */
class CardDataService {
  constructor(dbQueries) {
    this.dbQueries = dbQueries;
    this.dataFetched = false;
    this.cards = [];
  }
  
  /**
   * Beregner poeng basert på kort-ID med ikke-lineær distribusjon
   */
  calculatePoints(cardId, minId, maxId) {
    // If there's only one card or invalid IDs
    if (minId === maxId || cardId === undefined || minId === undefined || maxId === undefined) {
      return 33; // Default to max points
    }
    
    // Normalize the ID (0 to 1 range, where 0 = minId and 1 = maxId)
    const normalizedId = (cardId - minId) / (maxId - minId);
    
    // Non-linear distribution using a power function
    // This will give more points to lower IDs with a non-linear curve
    const pointsValue = 33 - (normalizedId * normalizedId * 25);
    
    // Round to nearest integer
    return Math.round(pointsValue);
  }
  
  /**
   * Henter alle kort fra databasen
   * @returns {Object} - Objekt med kort-array
   */
  async fetchAllCards() {
    if (this.dataFetched) return { cards: this.cards };
    
    if (!this.dbQueries) {
      throw new Error("Database queries object is not available");
    }
    
    // Fetch all category IDs
    const categoryIds = await this.dbQueries.getAllCategoryIds();
    
    const fetchedCards = [];
    
    // Process each category ID
    for (const categoryId of categoryIds) {
      try {
        const cardsData = await this.dbQueries.getCardById(categoryId);
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
    
    console.log("MinID:", minId);
    console.log("MaxID:", maxId);
    
    // Calculate points for each card
    fetchedCards.forEach(card => {
      if (card.id !== null) {
        card.points = this.calculatePoints(card.id, minId, maxId);
      }
    });
    
    this.cards = fetchedCards;
    this.dataFetched = true;
    
    return { cards: this.cards };
  }
  
  /**
   * Nullstiller datahentingsstatus
   */
  resetFetchState() {
    this.dataFetched = false;
  }
}

// ------------------------------
// PRESENTER/RENDERER
// ------------------------------

/**
 * Renderer-klasse for kort
 * Håndterer visning av kortets komponenter
 */
class CardRenderer {
  /**
   * Renderer tekst, med fallback hvis tom
   */
  static renderText(text, fallback = '') {
    return text || fallback;
  }
  
  /**
   * Renderer en egenskap (label-value par)
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
   * Renderer kategoriseksjonen
   * Inneholder:
   * - Kategorititel
   * - Kategoribeskrivelse
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
   * Renderer poengdelene på kortet
   * Poengverdi med fargekoding basert på nivå
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
   * Renderer spørsmålseksjonen
   * Inneholder spørsmålstekst
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
   * Renderer alternativer
   * For hvert alternativ vises:
   * - Tekst
   * - Beskrivelse
   * - "Hva" informasjon
   * - "Hvordan" informasjon
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
   * Renderer et helt kort
   * Struktur:
   * - Header (ID og poeng)
   * - Kategori
   * - Spørsmål
   * - Alternativer
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

// ------------------------------
// HOVEDKOMPONENT
// ------------------------------

/**
 * CardFactory-komponenten
 * Hovedkomponent som håndterer henting og visning av kort
 */
const CardFactory = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardService, setCardService] = useState(null);
  
  const { dbQueries, isConnected, isInitializing, connectionError } = useNeo4j();
  
  // Initialize card service
  useEffect(() => {
    if (dbQueries) {
      setCardService(new CardDataService(dbQueries));
    }
  }, [dbQueries]);
  
  // Fetch data from Neo4j database
  const fetchData = useCallback(async () => {
    console.log("Neo4j connection status:", { isInitializing, isConnected, connectionError });
    
    if (isInitializing) return;
    
    if (!isConnected || connectionError) {
      setError(`Database connection error: ${connectionError}`);
      setLoading(false);
      return;
    }
    
    if (!cardService) {
      setError("Card service is not available");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      const { cards: fetchedCards } = await cardService.fetchAllCards();
      
      setCards(fetchedCards);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [cardService, isConnected, isInitializing, connectionError]);
  
  // Run fetchData when necessary
  useEffect(() => {
    if (cardService && isConnected && !isInitializing) {
      fetchData();
    }
  }, [cardService, isConnected, isInitializing, fetchData]);
  
  // Manual data refresh
  const refreshData = () => {
    if (cardService) {
      cardService.resetFetchState();
      fetchData();
    }
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