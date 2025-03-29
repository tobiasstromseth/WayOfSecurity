// src/components/pages/TestCards/TestCards.jsx
import React, { useState } from 'react';
import Header from '../../common/Header/Header';
import CardFactory from '../../common/Card/Card';
import Background from '../../common/SpritesLoader/BackgroundSprites';
import './TestCards.css';

// Add some basic styling for the view toggle
const toggleStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem 0 1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    background: 'var(--blue)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  activeButton: {
    background: 'var(--purple)',
    fontWeight: 'bold',
  }
};

const TestCards = () => {
  const [viewMode, setViewMode] = useState('assessment'); // 'assessment' or 'results'
  
  return (
    <div className="page-container">
      <Header />
      <Background numberOfSprites={20} />
      <div style={{ marginTop: '3rem', padding: '1rem' }}>
        {/* View Mode Toggle */}
        <div style={toggleStyles.container}>
          <button 
            style={{
              ...toggleStyles.button,
              ...(viewMode === 'assessment' ? toggleStyles.activeButton : {})
            }}
            onClick={() => setViewMode('assessment')}
          >
            Assessment Mode
          </button>
          <button 
            style={{
              ...toggleStyles.button,
              ...(viewMode === 'results' ? toggleStyles.activeButton : {})
            }}
            onClick={() => setViewMode('results')}
          >
            Results Mode
          </button>
        </div>
        
        <CardFactory mode={viewMode} />
      </div>
    </div>
  );
};

export default TestCards;