import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNeo4j } from '../../../context/Neo4jContext';
import Neo4jCard from './CardFactory';
import './CardContainer.css';

const CardContainer = () => {
  const [cardIds, setCardIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const neo4jContext = useNeo4j();
  
  useEffect(() => {
    const fetchCardIds = async () => {
      try {
        setLoading(true);
        
        // Sjekk om Neo4j-tilkoblingen er klar og tilkoblet
        if (neo4jContext && !neo4jContext.isInitializing && neo4jContext.isConnected && neo4jContext.getAllCards) {
          try {
            const ids = await neo4jContext.getAllCards();
            setCardIds(ids);
            setError(null);
          } catch (dbError) {
            console.error('Feil ved henting av kort-IDer fra Neo4j:', dbError);
          }
        } else {
          // Hvis tilkoblingen ikke er klar eller isConnected er false, bruk statiske data
        }
      } catch (err) {
        console.error('Feil ved henting av kort-IDer:', err);
        setError('Kunne ikke hente kort fra databasen');
      } finally {
        setLoading(false);
      }
    };
    
    
    // Hent data når komponenten monteres eller Neo4j-konteksten endres
    fetchCardIds();
  }, [neo4jContext]);
  
  // Vis laster-indikator mens vi venter
  if (loading) {
    return <div className="loading-container">Laster kort...</div>;
  }

  // Vis feilmelding hvis noe gikk galt
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <p>Prøv å laste siden på nytt eller kontakt support</p>
      </div>
    );
  }
  
  // Vis melding hvis ingen kort ble funnet
  if (cardIds.length === 0) {
    return <div className="empty-container">Ingen kort funnet</div>;
  }
  
  // Vis kort i rutenett
  return (
    <div className="cards-grid">
      {cardIds.map((id, index) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
        >
          <Neo4jCard cardId={id} />
        </motion.div>
      ))}
    </div>
  );
};

export default CardContainer;