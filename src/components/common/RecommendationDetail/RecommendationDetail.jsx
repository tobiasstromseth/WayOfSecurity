import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { categoryIcons } from '../../../data/categories'; // Keeping icons for now
import { useNeo4j } from '../../../context/Neo4jContext';
import ModalPortal from '../ModalPortal/ModalPortal';
import './RecommendationDetail.css';

const RecommendationDetailComponent = ({ categoryId, status, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);
  const { dbQueries, isConnected } = useNeo4j();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!isConnected || !dbQueries) {
        setError("Database connection not available");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Fetch category data from Neo4j
        const cardsData = await dbQueries.getCardById(categoryId);
        
        if (!cardsData || cardsData.length === 0) {
          setError("Category not found");
          setLoading(false);
          return;
        }
        
        // Extract category information from the first record
        const firstRecord = cardsData[0].toObject();
        
        const category = {
          id: categoryId,
          text: firstRecord.kategori_tekst,
          description: firstRecord.kategori_beskrivelse,
          icon: 'resources' // Default icon
        };
        
        // Build unique recommendations from all alternatives
        const alternativesMap = new Map();
        
        cardsData.forEach(record => {
          const data = record.toObject();
          const altText = data.alternativ_tekst;
          
          if (altText && !alternativesMap.has(altText)) {
            alternativesMap.set(altText, {
              text: altText,
              description: data.alternativ_beskrivelse,
              what: data.alternativ_hva,
              how: data.alternativ_hvordan
            });
          }
        });
        
        const alternatives = Array.from(alternativesMap.values());
        
        setCategoryData(category);
        setRecommendationData({
          title: category.text,
          alternatives: alternatives
        });
        
      } catch (err) {
        console.error("Error fetching category data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [categoryId, dbQueries, isConnected]);
  
  // Loading state
  if (loading) {
    return (
      <ModalPortal>
        <motion.div 
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="detail-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-header">
              <h2 className="title">Laster anbefalinger...</h2>
              <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="content-container">
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                Henter data fra databasen...
              </div>
            </div>
          </motion.div>
        </motion.div>
      </ModalPortal>
    );
  }

  // Error state
  if (error) {
    return (
      <ModalPortal>
        <motion.div 
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="detail-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-header">
              <h2 className="title">Feil ved lasting av data</h2>
              <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="content-container">
              <div style={{ color: 'red', padding: '1rem' }}>
                {error}
              </div>
            </div>
            <div className="close-button-container">
              <button className="action-button" onClick={onClose}>Lukk</button>
            </div>
          </motion.div>
        </motion.div>
      </ModalPortal>
    );
  }

  // No data
  if (!categoryData || !recommendationData) {
    return (
      <ModalPortal>
        <motion.div 
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="detail-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-header">
              <h2 className="title">Ingen data funnet</h2>
              <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="content-container">
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                Ingen anbefalinger funnet for denne kategorien.
              </div>
            </div>
            <div className="close-button-container">
              <button className="action-button" onClick={onClose}>Lukk</button>
            </div>
          </motion.div>
        </motion.div>
      </ModalPortal>
    );
  }
  
  // Pick an appropriate icon for the category or use a random one if not found
  const icon = categoryIcons[categoryData.icon] || 
               Object.values(categoryIcons)[Math.floor(Math.random() * Object.values(categoryIcons).length)];

  return (
    <ModalPortal>
      <motion.div 
        className="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="detail-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="detail-header">
            <h2 className="title">{recommendationData.title}</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          
          <div className="content-container">
            {icon && (
              <div className="icon-container">{icon}</div>
            )}
            
            <div className="score-display">
              <span className="score-text">Oppfylt:</span>
              <div className="score-bar">
                <div 
                  className="score-fill" 
                  style={{ width: `${(status.fulfilled / status.total) * 100}%` }}
                />
              </div>
              <span className="score-text">{status.fulfilled} av {status.total}</span>
            </div>
            
            <p className="description">
              {categoryData.description}
            </p>
            
            <p className="description">
              Her er anbefalte tiltak for å forbedre sikkerheten innen {recommendationData.title.toLowerCase()}:
            </p>
            
            <ul className="recommendations-list">
              {recommendationData.alternatives.map((alt, index) => (
                <li className="recommendation-item" key={index}>
                  <div className="recommendation-title">{alt.text}</div>
                  {alt.description && (
                    <div className="recommendation-detail">
                      {alt.description}
                    </div>
                  )}
                  {alt.what && (
                    <div className="recommendation-detail">
                      <span className="recommendation-label">Hva:</span>
                      {alt.what}
                    </div>
                  )}
                  {alt.how && (
                    <div className="recommendation-detail">
                      <span className="recommendation-label">Hvordan:</span>
                      {alt.how}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="close-button-container">
            <button className="action-button" onClick={onClose}>Lukk</button>
          </div>
        </motion.div>
      </motion.div>
    </ModalPortal>
  );
};

export default RecommendationDetailComponent;