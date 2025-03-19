import React, { useState } from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const QuestionText = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.75rem;
`;

const Standard = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 1rem;
  font-style: italic;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: ${props => props.showInfo ? '1rem' : '0'};
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const Option = styled.button`
  background-color: ${props => {
    if (props.selected) {
      return props.value ? '#e8f5e9' : '#ffebee';
    }
    return '#f0f0f0';
  }};
  color: ${props => {
    if (props.selected) {
      return props.value ? '#2e7d32' : '#c62828';
    }
    return '#333';
  }};
  border: 1px solid ${props => {
    if (props.selected) {
      return props.value ? '#81c784' : '#ef9a9a';
    }
    return '#ddd';
  }};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  flex: 1;
  text-align: center;
  
  &:hover {
    background-color: ${props => {
      if (props.selected) {
        return props.value ? '#c8e6c9' : '#ffcdd2';
      }
      return '#e0e0e0';
    }};
  }
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  color: #2196F3;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  text-align: left;
  margin-top: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const InfoPanel = styled.div`
  background-color: #e3f2fd;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const InfoTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1976d2;
`;

const InfoText = styled.div`
  color: #333;
`;

const Question = ({ question, answer, onChange }) => {
  const [showInfo, setShowInfo] = useState(false);
  
  const handleOptionClick = (value) => {
    onChange(value);
  };
  
  const toggleInfo = () => {
    setShowInfo(prev => !prev);
  };
  
  return (
    <QuestionContainer>
      <QuestionText>{question.text}</QuestionText>
      <Standard>Standard: {question.standard}</Standard>
      
      <OptionsContainer showInfo={showInfo}>
        <Option 
          selected={answer === true} 
          value={true}
          onClick={() => handleOptionClick(true)}
        >
          JA
        </Option>
        <Option 
          selected={answer === false} 
          value={false}
          onClick={() => handleOptionClick(false)}
        >
          NEI
        </Option>
      </OptionsContainer>
      
      <InfoButton onClick={toggleInfo}>
        {showInfo ? 'Skjul forklaring' : 'Vis forklaring'}
      </InfoButton>
      
      {showInfo && (
        <InfoPanel>
          <InfoTitle>Hvorfor er dette viktig?</InfoTitle>
          <InfoText>{question.explanation}</InfoText>
        </InfoPanel>
      )}
    </QuestionContainer>
  );
};

export default Question;