import React from 'react';
import Header from '../../common/Header/Header';
import CardContainer from '../../common/Card/CardContainer';
import './TestCards.css';

const TestCards = () => {
  return (
    <div className="page-container">
      <Header />
      
      <header className="cards-header">
        <h1 className="cards-title">SIKKERHETSKORT</h1>
        <p className="cards-subtitle">Utforsk sikkerhetstiltak for din bedrift</p>
      </header>
      
      <CardContainer />
    </div>
  );
};

export default TestCards;