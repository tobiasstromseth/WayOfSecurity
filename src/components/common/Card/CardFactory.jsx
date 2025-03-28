import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Neo4jCard = ({ cardId }) => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        // Simulate API call to Neo4j - replace with actual endpoint
        // const response = await fetch(`/api/card/${cardId}`);
        // const data = await response.json();
        
        // Simulated data for development
        const data = {
          id: cardId,
          poeng: 10,
          kategori_tekst: "Objektorienterte kort",
          sporsmal_tekst: "Hvilken designmønster bruker du for å lage objekter?",
          alternativ_tekst: "Factory pattern",
          alternativ_poeng: 5,
          bruker_poeng: 0,
          forklaringer: "Factory pattern brukes for å skape objekter uten å spesifisere den eksakte klassen for objektet.",
          tiltak: "Implementer en factory klasse som håndterer opprettelsen av kortene basert på dataene fra Neo4j.",
          state: "ikke_avhuket"
        };
        
        setCardData(data);
        setCheckboxState(data.state === 'avhuket');
      } catch (err) {
        console.error('Error fetching card:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCardData();
  }, [cardId]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    const newState = e.target.checked;
    setCheckboxState(newState);
    
    // Update card state in Neo4j (simulated)
    console.log(`Updating card ${cardId} state to ${newState ? 'avhuket' : 'ikke_avhuket'}`);
    // In real implementation:
    // await fetch(`/api/card/${cardId}/state`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ state: newState ? 'avhuket' : 'ikke_avhuket' })
    // });
  };
  
  if (loading) {
    return <div className="card-skeleton"></div>;
  }
  
  if (!cardData) return null;
  
  const totalPoints = checkboxState ? cardData.poeng + cardData.alternativ_poeng : 0;
  
  return (
    <div className={`neo4j-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-inner">
        {/* Front side */}
        <div className="card-front">
          <div className="card-category">{cardData.kategori_tekst}</div>
          <h3 className="card-question">{cardData.sporsmal_tekst}</h3>
          <p className="card-alternative">{cardData.alternativ_tekst}</p>
          <div className="card-footer">
            <span className="card-id">ID: {cardData.id.substring(0, 8)}</span>
            <span className="card-points">{cardData.poeng} poeng</span>
          </div>
          <div className="card-checkbox" onClick={(e) => e.stopPropagation()}>
            <input 
              type="checkbox" 
              checked={checkboxState}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        
        {/* Back side */}
        <div className="card-back">
          <h4 className="section-title">Forklaringer:</h4>
          <p className="section-content">{cardData.forklaringer}</p>
          
          <h4 className="section-title">Tiltak:</h4>
          <p className="section-content">{cardData.tiltak}</p>
          
          <div className="points-summary">
            <div className="points-row">
              <span>Alternativ poeng:</span>
              <span>{cardData.alternativ_poeng}</span>
            </div>
            <div className="points-row">
              <span>Bruker poeng:</span>
              <span>{cardData.bruker_poeng}</span>
            </div>
            <div className="points-row total">
              <span>Totalt:</span>
              <span>{totalPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Neo4jCard;