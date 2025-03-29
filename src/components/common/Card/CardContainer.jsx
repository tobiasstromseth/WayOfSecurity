// CardContainer.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNeo4j } from '../../../context/Neo4jContext';
import CardFactory from './CardFactory';

const CardContainer = () => {
  
  return (
    <div className="card-container">
      <CardFactory />
    </div>
  );
}

export default CardContainer;