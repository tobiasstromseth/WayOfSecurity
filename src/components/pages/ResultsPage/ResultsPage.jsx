import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentContext } from '../../../context/AssessmentContext';
import { categories } from '../../../data/categories';
import { categoryIcons } from '../../../data/categories';
import RecommendationDetail from '../../common/RecommendationDetail';
import Header from '../../common/Header/Header';
import './ResultsPage.css';

const ResultsPage = () => {
  const { securityScore, getCategoryStatus } = useContext(AssessmentContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
      setFlipped(true);
    }, 500);
  }, []);
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleCloseDetail = () => {
    setSelectedCategory(null);
  };
  
  const handleRestart = () => {
    navigate('/');
  };
  
  const getScoreMessage = (score) => {
    if (score >= 80) return 'Utmerket! Din bedrift har en sterk sikkerhetsposisjon.';
    if (score >= 60) return 'Bra! Din bedrift har en god grunnleggende sikkerhet, men har rom for forbedring.';
    if (score >= 40) return 'Moderat. Det er flere områder som trenger forbedring for å styrke sikkerheten.';
    return 'Svak. Din bedrift har betydelige sikkerhetshull som bør adresseres umiddelbart.';
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-success';
    if (score >= 50) return 'score-warning';
    return 'score-error';
  };
  
  return (
    <div className="page-container">
      <motion.div
        className="flip-container"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 1 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flipped-content">
        <Header /> 
          <header className="results-header">
          <h1 className="results-header-title">SIKKERHETSTLTAK</h1>
            <div className={`score-display ${getScoreClass(securityScore)}`}>
              Din score: {securityScore}/100
            </div>
            <p className="score-message">{getScoreMessage(securityScore)}</p>
          </header>
          
          <div className="grid">
            {categories.map(category => {
              const status = getCategoryStatus(category.id);
              const icon = categoryIcons[category.icon] || null;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 + Math.random() * 0.5 }}
                >
                  <div 
                    className={`results-card ${status.fulfilled === status.total ? 'fulfilled' : 
                              status.fulfilled > 0 ? 'partial' : 'unfulfilled'}`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="icon-container">{icon}</div>
                    <h3 className="card-title">{category.name}</h3>
                    
                    <div className="score-bar">
                      <div 
                        className={`score-fill ${status.fulfilled === status.total ? 'fulfilled' : 
                                  status.fulfilled > 0 ? 'partial' : 'unfulfilled'}`}
                        style={{ width: `${(status.fulfilled / status.total) * 100}%` }}
                      />
                    </div>
                    
                    <div className="score-text">
                      {status.fulfilled} av {status.total} tiltak oppfylt
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="button-container">
            <button className="action-button" onClick={handleRestart}>
              Start ny vurdering
            </button>
            <button className="action-button primary" onClick={() => window.print()}>
              Skriv ut resultater
            </button>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <RecommendationDetail 
            categoryId={selectedCategory}
            status={getCategoryStatus(selectedCategory)}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultsPage;