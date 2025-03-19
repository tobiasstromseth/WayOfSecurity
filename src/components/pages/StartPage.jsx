import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
`;

const Subtitle = styled.h2`
  color: #666;
  font-size: 1.5rem;
  font-weight: normal;
`;

const InfoSection = styled.section`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block;
  margin: 2rem auto 0;
  
  &:hover {
    background-color: #45a049;
  }
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  
  li {
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:before {
      content: "✓";
      color: #4CAF50;
      margin-right: 0.5rem;
      font-weight: bold;
    }
  }
`;

const StartPage = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate('/assessment');
  };
  
  return (
    <PageContainer>
      <Header>
        <Title>Basline cybsikk lightweight</Title>
        <Subtitle>Enkel cybersikkerhetsvurdering for mikrobedrifter</Subtitle>
      </Header>
      
      <InfoSection>
        <h2>Om verktøyet</h2>
        <p>
          Dette verktøyet hjelper mikrobedrifter med å vurdere sin digitale sikkerhet gjennom enkle spørsmål 
          og gir praktiske anbefalinger basert på dine svar. Verktøyet er designet for å være lett å bruke 
          selv uten teknisk ekspertise.
        </p>
        
        <h3>Funksjoner:</h3>
        <FeatureList>
          <li>Rask vurdering av din cybersikkerhet</li>
          <li>Personlige anbefalinger basert på dine svar</li>
          <li>Enkel visualisering av styrker og svakheter</li>
          <li>Praktiske tiltak som forbedrer sikkerheten</li>
          <li>Basert på anerkjente sikkerhetsstandarder</li>
        </FeatureList>
        
        <Button onClick={handleStart}>Start vurdering</Button>
      </InfoSection>
    </PageContainer>
  );
};

export default StartPage;