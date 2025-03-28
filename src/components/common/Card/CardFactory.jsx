import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNeo4j } from '../../../context/Neo4jContext';
import './Card.css';

const Neo4jCard = ({ cardId }) => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  
  const neo4jContext = useNeo4j();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        
        // Sjekk om Neo4j-tilkoblingen er klar
        if (neo4jContext && !neo4jContext.isInitializing && neo4jContext.isConnected && neo4jContext.getCardById) {
          try {
            const data = await neo4jContext.getCardById(cardId);
            
            if (data) {
              setCardData(data);
              setCheckboxState(data.state === 'avhuket');
            } else {
              console.warn(`Kort med ID ${cardId} ble ikke funnet, bruker statiske data`);
              loadStaticData();
            }
          } catch (dbError) {
            console.error('Feil ved henting av kortdata fra Neo4j:', dbError);
            loadStaticData();
          }
        } else {
          // Hvis tilkoblingen ikke er klar eller isConnected er false, bruk statiske data
          loadStaticData();
        }
      } catch (err) {
        console.error('Feil ved henting av kort:', err);
        loadStaticData();
      } finally {
        setLoading(false);
      }
    };
    
    // Funksjon for å bruke statiske data
    const loadStaticData = () => {
      // Statiske data for utvikling
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
    };
    
    // Hent data når komponenten monteres eller cardId endres
    fetchCardData();
    
    // Hvis Neo4j-tilkoblingsstatus endres, prøv igjen
  }, [cardId, neo4jContext]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleCheckboxChange = async (e) => {
    e.stopPropagation();
    const newState = e.target.checked;
    setCheckboxState(newState);
    
    try {
      // Oppdater kortets tilstand i Neo4j hvis tilkoblingen er tilgjengelig
      if (neo4jContext && neo4jContext.isConnected && neo4jContext.updateCardState) {
        await neo4jContext.updateCardState(
          cardId, 
          newState ? 'avhuket' : 'ikke_avhuket'
        );
        console.log(`Kort ${cardId} oppdatert til ${newState ? 'avhuket' : 'ikke_avhuket'}`);
      } else {
        console.warn("Neo4j-tilkobling ikke tilgjengelig, kan ikke oppdatere korttilstand");
      }
    } catch (error) {
      console.error('Feil ved oppdatering av kort:', error);
      // Tilbakestill checkbox hvis oppdatering feilet
      setCheckboxState(!newState);
    }
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