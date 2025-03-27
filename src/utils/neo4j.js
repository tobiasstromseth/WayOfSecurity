import neo4j from "neo4j-driver";

// Neo4j connection configuration
const NEO4J_URI = process.env.REACT_APP_NEO4J_URI || "bolt://localhost:7687";
const NEO4J_USER = process.env.REACT_APP_NEO4J_USER || "neo4j";
const NEO4J_PASSWORD = process.env.REACT_APP_NEO4J_PASSWORD || "password";

// Create a driver instance
const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD),
  {
    maxConnectionLifetime: 3 * 60 * 60 * 1000,
    maxConnectionPoolSize: 50,
    connectionAcquisitionTimeout: 2 * 60 * 1000,
  }
);

// Export the driver to be used across the application
export default driver;

// Helper function to create a session
export const getSession = () => {
  return driver.session();
};

// Helper function to execute a Cypher query
export const executeCypher = async (cypher, params = {}) => {
  const session = getSession();
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

// Verify connection on initialization
const verifyConnection = async () => {
  const session = getSession();
  try {
    await session.run("RETURN 1");
    console.log("Connected to Neo4j database");
  } catch (error) {
    console.error("Failed to connect to Neo4j:", error);
  } finally {
    await session.close();
  }
};

// Attempt to verify connection when this module is imported
verifyConnection();
