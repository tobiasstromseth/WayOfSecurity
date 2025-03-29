import React from "react";
import { useNeo4j } from "../../../context/Neo4jContext";
import "./DatabaseStatus.css";

const DatabaseStatus = () => {
  const { isConnected, connectionError, isInitializing } = useNeo4j() || {};

  // Ikke vis i produksjon
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  // Determine which status class to use
  const getStatusClass = () => {
    if (isInitializing) return "status-initializing";
    if (isConnected) return "status-connected";
    return "status-error";
  };

  // Determine which dot class to use
  const getDotClass = () => {
    if (isInitializing) return "dot-initializing";
    if (isConnected) return "dot-connected";
    return "dot-error";
  };

  return (
    <div className={`status-container ${getStatusClass()}`}>
      <div className={`status-dot ${getDotClass()}`} />
      {isInitializing 
        ? "Kobler til Neo4j..."
        : isConnected
          ? "Neo4j Connected"
          : `Neo4j Connection Error: ${connectionError || "Unknown error"}`}
    </div>
  );
};

export default DatabaseStatus;