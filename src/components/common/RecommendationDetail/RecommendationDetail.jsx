// src/components/common/RecommendationDetail/RecommendationDetail.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { categoryIcons } from '../../../data/categories'; // Keep icons for now
import { useCards } from '../../../context/CardContext';
import ModalPortal from '../ModalPortal/ModalPortal';
import './RecommendationDetail.css';

const RecommendationDetailComponent = ({ categoryId, status, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);
  const { cards, getCardById } = useCards();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get card data from CardContext instead of directly from Neo4j
        const card = cards.find(c => c.id?.toString() === categoryId || c.id === parseInt(categoryId));
        
        if (!card) {
          setError("Category not found");
          setLoading(false);
          return;
        }
        
        // Extract category information
        const category = {
          id: categoryId,
          text: card.category?.text || "",
          description: card.category?.description || "",
          icon: 'resources' // Default icon
        };
        
        // Build recommendations from alternatives
        const alternatives = card.alternatives.map(alt => ({
          text: alt.text || "",
          description: alt.description || "",
          what: alt.what || "",
          how: alt.how || ""
        }));
        
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
  }, [categoryId, cards]);
  
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
                Henter data...
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