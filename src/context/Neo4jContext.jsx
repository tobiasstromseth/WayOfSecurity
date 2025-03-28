import React, { createContext, useContext, useState, useEffect } from 'react';
import neo4j from 'neo4j-driver';
import DBQueries, { Neo4jContext } from './DBQueries';

export const Neo4jProvider = ({ children }) => {
  const [driver, setDriver] = useState(null);
  const [dbQueries, setDbQueries] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const testConnection = async (driver) => {
    const session = driver.session();
    try {
      // Kjør en enkel spørring som henter alt for å verifisere at tilkoblingen fungerer
      const result = await session.run('MATCH (n) RETURN * LIMIT 1');
      
      // Sjekk at spørringen fungerer før vi bekrefter tilkobling
      if (result && result.records) {
        console.log('Testspørring vellykket:', result.records.length ? 'Data funnet' : 'Ingen data funnet');
        console.log(result)
        return true;
      } else {
        throw new Error('Spørring kjørte, men returnerte ugyldig resultatformat');
      }
    } catch (error) {
      console.error('Feil ved testspørring:', error);
      throw error;
    } finally {
      await session.close();
    }
  };

  useEffect(() => {
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
        
        // Verifiser tilkobling
        await newDriver.verifyConnectivity();
        
        // Kjør testspørring
        await testConnection(newDriver);
        
        const queries = new DBQueries(newDriver);
        
        setDriver(newDriver);
        setDbQueries(queries);
        setIsConnected(true);
        setConnectionError(null);
        
        console.log('Neo4j-tilkobling opprettet og testet');
      } catch (err) {
        console.error('Feil ved oppretting eller testing av Neo4j-tilkobling:', err);
        setConnectionError(err.message);
        setIsConnected(false);
      } finally {
        setIsInitializing(false);
      }
    };

    initDriver();

    return () => {
      if (driver) {
        driver.close();
        console.log('Neo4j-tilkobling lukket');
      }
    };
  }, []);

  const contextValue = {
    ...dbQueries,
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

export { useNeo4j } from './DBQueries';