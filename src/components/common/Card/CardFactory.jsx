// CardFactory.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNeo4j } from '../../../context/Neo4jContext';
import './Card.css';

const CardFactory = () => {
  const [categoryIds, setCategoryIds] = useState([]);
  const [cardIds, setCardIds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get the context value which contains both the driver and dbQueries
  const { driver, dbQueries, isConnected, isInitializing, connectionError } = useNeo4j();
  
  useEffect(() => {
    const fetchIds = async () => {
      console.log("Neo4j connection status:", { isInitializing, isConnected, connectionError });
      console.log("Context values:", { driver: !!driver, dbQueries: !!dbQueries });
      
      if (isInitializing) {
        console.log("Neo4j connection is initializing...");
        return;
      }
      
      if (!isConnected || connectionError) {
        setError(`Database connection error: ${connectionError}`);
        setLoading(false);
        return;
      }
      
      if (!dbQueries) {
        setError("Database queries object is not available");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Get all category IDs using the dbQueries from context
        console.log("Fetching category IDs...");
        const categories = await dbQueries.getAllCategoryIds();
        setCategoryIds(categories);
        console.log("Category IDs:", categories);
        
        // Get all card IDs
        console.log("Fetching card IDs...");
        const cards = await dbQueries.getAllCards();
        setCardIds(cards);
        console.log("Card IDs:", cards);
        
        // Log all IDs together
        console.log("All IDs:", [...categories, ...cards]);
        
        setError(null);
      } catch (error) {
        console.error("Error fetching IDs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIds();
  }, [dbQueries, isConnected, isInitializing, connectionError, driver]);
  
  return (
    <div className="card-factory">
      {loading ? (
        <p>Loading data from Neo4j database...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : categoryIds.length > 0 ? (
        <div>
          <p>Found {categoryIds.length} categories and {cardIds.length} cards</p>
          <ul>
            <li>Categories: {categoryIds.join(', ')}</li>
            <li>Cards: {cardIds.join(', ')}</li>
          </ul>
        </div>
      ) : (
        <p>No data found in the database</p>
      )}
    </div>
  );
}

export default CardFactory;