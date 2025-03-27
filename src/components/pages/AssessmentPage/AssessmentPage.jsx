import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AssessmentContext } from '../../../context/AssessmentContext';
import { categories, categoryIcons } from '../../../data/categories';
import CategoryDetail from '../../common/Category/CategoryDetail';
import './AssessmentPage.css';

const AssessmentPage = () => {
  const { 
    securityScore, 
    completedCategories, 
    isAssessmentComplete,
    getCategoryStatus
  } = useContext(AssessmentContext);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const cardsRef = useRef([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const calculateRows = () => {
      if (!cardsRef.current.length) return;
      
      const cards = cardsRef.current.filter(ref => ref);
      if (!cards.length) return;
      
      let currentRowTop = cards[0]?.getBoundingClientRect().top;
      let rows = [];
      let currentRow = [];
      
      cards.forEach((card, index) => {
        const { top } = card.getBoundingClientRect();
        
        if (Math.abs(top - currentRowTop) > 10) {
          rows.push([...currentRow]);
          currentRow = [index];
          currentRowTop = top;
        } else {
          currentRow.push(index);
        }
      });
      
      if (currentRow.length) {
        rows.push([...currentRow]);
      }
      
      const newVisibleRows = rows.slice(0, -1).map(row => row[row.length - 1]);
      setVisibleRows(newVisibleRows);
    };
    
    calculateRows();
    window.addEventListener('resize', calculateRows);
    
    return () => {
      window.removeEventListener('resize', calculateRows);
    };
  }, [categories.length]);
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleCloseDetail = () => {
    setSelectedCategory(null);
  };
  
  const handleNext = () => {
    navigate('/results');
  };
  
  const progress = Math.round((completedCategories.length / categories.length) * 100);
  
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, categories.length);
  }, [categories.length]);
  
  return (
    <div className="page-container">
      <header className="header">
        <div className="title-container">
          <h1 className="title">12 VEIER TIL SIKKERHET</h1>
        </div>
        <div className="vikings-container">
          <div style={{ fontSize: '40px' }}>👨‍🦰👨‍🦱👨‍🦳</div>
        </div>
      </header>
      
      <div className="status-bar">
        <div>Kategorier gjennomført: {completedCategories.length}/{categories.length}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div>Din sikkerhetsscore: {securityScore}/100</div>
      </div>
      
      <div className="categories-container">
        <div className="categories-grid">
          {categories.map((category, index) => {
            const status = getCategoryStatus(category.id);
            const isComplete = completedCategories.includes(category.id);
            const shouldShowDivider = visibleRows.includes(index);
            
            return (
              <React.Fragment key={category.id}>
                <motion.div
                  ref={el => cardsRef.current[index] = el}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="category-card" onClick={() => handleCategoryClick(category.id)}>
                    <div className="icon-container">
                      {categoryIcons[category.icon]}
                    </div>
                    <h3 className="category-title">{category.name}</h3>
                    <p className="category-description">
                      {category.description}
                    </p>
                    <div className={`status-indicator ${isComplete ? 'complete' : ''}`}>
                      {status.answered}/{status.total} spørsmål besvart
                    </div>
                  </div>
                </motion.div>
                
                {shouldShowDivider && <div className="wavy-divider"></div>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      <div className="button-container">
        <button 
          className={`action-button ${isAssessmentComplete() ? 'primary' : ''}`}
          onClick={handleNext}
          disabled={!isAssessmentComplete()}
        >
          {isAssessmentComplete() 
            ? "Se anbefalte tiltak" 
            : `Fullfør alle ${categories.length} kategorier for å fortsette`}
        </button>
      </div>
      
      {selectedCategory && (
        <CategoryDetail 
          categoryId={selectedCategory}
          onClose={handleCloseDetail}
          standalone={true}
        />
      )}
    </div>
  );
};

export default AssessmentPage;