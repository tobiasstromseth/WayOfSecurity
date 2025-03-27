import React from 'react';
import styled from 'styled-components';
import { useNeo4j } from '../../context/Neo4jContext';

const StatusContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 1000;
  background-color: ${props => props.isConnected ? '#d4edda' : '#f8d7da'};
  color: ${props => props.isConnected ? '#155724' : '#721c24'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.isConnected ? '#28a745' : '#dc3545'};
`;

const DatabaseStatus = () => {
  const { isConnected, connectionError } = useNeo4j();

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <StatusContainer isConnected={isConnected}>
      <StatusDot isConnected={isConnected} />
      {isConnected 
        ? 'Neo4j Connected' 
        : `Neo4j Connection Error: ${connectionError || 'Unknown error'}`}
    </StatusContainer>
  );
};

export default DatabaseStatus;