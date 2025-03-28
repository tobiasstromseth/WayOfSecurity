// Neo4jContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import neo4j from 'neo4j-driver';
import DBQueries from './DBQueries';

// Create the context
export const Neo4jContext = createContext(null);

// Custom hook to use the context
export const useNeo4j = () => useContext(Neo4jContext);

export const Neo4jProvider = ({ children }) => {
  const [dbQueries, setDbQueries] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const driverRef = useRef(null);

  // Kun én gang ved oppstart
  useEffect(() => {
    // Ikke initialiser på nytt hvis vi allerede har en driver
    if (driverRef.current) return;

    const initDriver = async () => {
      try {
        setIsInitializing(true);
        
        const uri = process.env.REACT_APP_NEO4J_URI || "bolt://localhost:7687";
        const user = process.env.REACT_APP_NEO4J_USER || "neo4j";
        const password = process.env.REACT_APP_NEO4J_PASSWORD || "password";
        
        console.log("Kobler til Neo4j med URI:", uri);
        
        let driverConfig = {};
        
        if (uri.includes('databases.neo4j.io') || uri.startsWith('neo4j+s://') || uri.startsWith('bolt+s://')) {
          driverConfig = { 
            encrypted: true,
            trust: 'TRUST_SYSTEM_CA_SIGNED_CERTIFICATES',
            connectionTimeout: 30000,
            maxConnectionPoolSize: 1,
          };
          
          console.log("Bruker AuraDB-tilkobling med spesiell konfigurasjon");
        } else {
          driverConfig = { encrypted: false };
          console.log("Bruker standard tilkobling med kryptering deaktivert");
        }
        
        const newDriver = neo4j.driver(
          uri,
          neo4j.auth.basic(user, password),
          driverConfig
        );
        
        // Verifiser tilkobling (kun én gang)
        await newDriver.verifyConnectivity();
        
        // Kjør en enkel testspørring
        const session = newDriver.session();
        try {
          await session.run('RETURN 1 as test');
          console.log('Neo4j-tilkobling testet og er OK');
          
          // Lagre driver i ref for å unngå reinitialisering
          driverRef.current = newDriver;
          
          // Opprett DBQueries-instans kun én gang
          const queries = new DBQueries(newDriver);
          setDbQueries(queries);
          setIsConnected(true);
          setConnectionError(null);
        } catch (error) {
          console.error('Feil ved testspørring:', error);
          setConnectionError(error.message);
          setIsConnected(false);
        } finally {
          await session.close();
        }
      } catch (err) {
        console.error('Feil ved oppretting av Neo4j-tilkobling:', err);
        setConnectionError(err.message);
        setIsConnected(false);
      } finally {
        setIsInitializing(false);
      }
    };

    initDriver();

    // Cleanup ved unmount
    return () => {
      if (driverRef.current) {
        driverRef.current.close();
        console.log('Neo4j-tilkobling lukket');
      }
    };
  }, []); // Tomt avhengighetsarray betyr at dette kjøres kun én gang ved første rendering

  // Make both the driver and dbQueries available in the context
  const contextValue = {
    driver: driverRef.current,
    dbQueries,
    isConnected,
    connectionError,
    isInitializing
  };

  return (
    <Neo4jContext.Provider value={contextValue}>
      {children}
    </Neo4jContext.Provider>
  );
};