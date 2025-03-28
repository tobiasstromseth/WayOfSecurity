import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../common/Header/Header';
import Neo4jCard from '../../common/Card/CardFactory';
import './TestCards.css';

const CardsPage = () => {
  const [cardIds, setCardIds] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCardIds = async () => {
      try {
        setLoading(true);
        
        // Simulate API call to get card IDs
        // In real implementation:
        // const response = await fetch('/api/cards/ids');
        // const ids = await response.json();
        
        // Sample IDs for development
        const ids = ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6'];
        
        setCardIds(ids);
      } catch (error) {
        console.error('Error fetching card IDs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCardIds();
  }, []);
  
  return (
    <div className="page-container">
      <Header />
      
      <header className="cards-header">
        <h1 className="cards-title">SIKKERHETSKORT</h1>
        <p className="cards-subtitle">Utforsk sikkerhetstiltak for din bedrift</p>
      </header>
      
      {loading ? (
        <div className="loading-container">
          <p>Laster kort...</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default CardsPage;