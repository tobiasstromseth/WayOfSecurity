import React from 'react';
import Header from '../../common/Header/Header';
import CardFactory from '../../common/Card/Card';
import './TestCards.css';

const TestCards = () => {
  return (
    <div className="page-container">
      <Header />      

      <CardFactory />
    </div>
  );
};

export default TestCards;