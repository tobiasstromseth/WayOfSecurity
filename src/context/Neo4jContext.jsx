import React, { createContext, useState, useContext, useEffect } from "react";
import neo4j from "neo4j-driver";

// Create context
export const Neo4jContext = createContext();

// Custom hook for using the Neo4j context
export const useNeo4j = () => useContext(Neo4jContext);

// Neo4j Provider component
export const Neo4jProvider = ({ children }) => {
  const [driver, setDriver] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    let neo4jDriver = null;

    const initDriver = async () => {
      try {
        const NEO4J_URI =
          process.env.REACT_APP_NEO4J_URI || "bolt://localhost:7687";
        const NEO4J_USER = process.env.REACT_APP_NEO4J_USER || "neo4j";
        const NEO4J_PASSWORD =
          process.env.REACT_APP_NEO4J_PASSWORD || "password";

        // Create driver without explicitly setting encryption
        // The protocol in the URI (bolt:// vs bolt+s://) will determine encryption
        neo4jDriver = neo4j.driver(
          NEO4J_URI,
          neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD),
          {
            maxConnectionLifetime: 3 * 60 * 60 * 1000,
            maxConnectionPoolSize: 50,
            connectionAcquisitionTimeout: 2 * 60 * 1000,
            // Do not set encrypted: false - let protocol in URI determine encryption
          }
        );

        // Test connection
        const session = neo4jDriver.session();
        await session.run("RETURN 1");
        await session.close();

        setDriver(neo4jDriver);
        setIsConnected(true);
        setConnectionError(null);
        console.log("Successfully connected to Neo4j");
      } catch (error) {
        console.error("Failed to connect to Neo4j:", error);
        setIsConnected(false);
        setConnectionError(error.message);

        if (neo4jDriver) {
          try {
            await neo4jDriver.close();
          } catch (closeError) {
            console.error("Error closing failed driver:", closeError);
          }
        }
      }
    };

    initDriver();

    return () => {
      const closeDriver = async () => {
        if (neo4jDriver) {
          try {
            await neo4jDriver.close();
            console.log("Neo4j driver closed");
          } catch (error) {
            console.error("Error closing Neo4j driver:", error);
          }
        }
      };

      closeDriver();
    };
  }, []);

  // Helper function to execute queries
  const executeCypher = async (cypher, params = {}) => {
    if (!driver) {
      throw new Error("No active Neo4j connection");
    }

    const session = driver.session();
    try {
      const result = await session.run(cypher, params);
      return result.records;
    } catch (error) {
      console.error("Neo4j Query Error:", error);
      throw error;
    } finally {
      await session.close();
    }
  };

  const value = {
    driver,
    isConnected,
    connectionError,
    executeCypher,
  };

  return (
    <Neo4jContext.Provider value={value}>{children}</Neo4jContext.Provider>
  );
};
