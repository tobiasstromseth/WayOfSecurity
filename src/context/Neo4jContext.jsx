import React, { createContext, useContext, useState, useEffect } from 'react';
import neo4j from 'neo4j-driver';
import DBQueries, { Neo4jContext } from './Neo4jContext';

const Neo4jProvider = ({ children, uri, username, password }) => {
  const [driver, setDriver] = useState(null);
  const [dbQueries, setDbQueries] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initDriver = async () => {
      try {
        // Opprett Neo4j-driver
        const newDriver = neo4j.driver(
          uri,
          neo4j.auth.basic(username, password)
        );
        
        // Test tilkoblingen
        await newDriver.verifyConnectivity();
        
        // Opprett ny DBQueries-instans
        const queries = new DBQueries(newDriver);
        
        setDriver(newDriver);
        setDbQueries(queries);
        setIsConnected(true);
        setError(null);
        
        console.log('Neo4j-tilkobling opprettet');
      } catch (err) {
        console.error('Feil ved oppretting av Neo4j-tilkobling:', err);
        setError(err.message);
        setIsConnected(false);
      }
    };

    if (uri && username && password) {
      initDriver();
    }

    // Rydd opp tilkoblingen når komponenten avmonteres
    return () => {
      if (driver) {
        driver.close();
        console.log('Neo4j-tilkobling lukket');
      }
    };
  }, [uri, username, password]);

  return (
    <Neo4jContext.Provider value={dbQueries}>
      {children}
    </Neo4jContext.Provider>
  );
};

export default Neo4jProvider;