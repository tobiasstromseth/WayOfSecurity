import React, { createContext, useState, useContext, useEffect } from 'react';
import driver, { executeCypher } from '../utils/neo4j';

// Create context
export const Neo4jContext = createContext();

// Custom hook for using the Neo4j context
export const useNeo4j = () => useContext(Neo4jContext);

// Neo4j Provider component
export const Neo4jProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  // Check connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const session = driver.session();
        await session.run('RETURN 1');
        session.close();
        setIsConnected(true);
        setConnectionError(null);
      } catch (error) {
        console.error('Failed to connect to Neo4j:', error);
        setIsConnected(false);
        setConnectionError(error.message);
      }
    };

    checkConnection();

    // Close the driver on unmount
    return () => {
      try {
        driver.close();
      } catch (error) {
        console.error('Error closing Neo4j driver:', error);
      }
    };
  }, []);

  // Context value
  const value = {
    driver,
    isConnected,
    connectionError,
    executeCypher
  };

  return (
    <Neo4jContext.Provider value={value}>
      {children}
    </Neo4jContext.Provider>
  );
};