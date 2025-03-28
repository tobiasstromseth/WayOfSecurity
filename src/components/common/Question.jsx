import React, { useState, memo } from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  background-color: ${props => props.theme.background.paper};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px ${props => props.theme.components.card.shadow};
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const QuestionText = styled.div`
  font-weight: 500;
  color: ${props => props.theme.text.primary};
  margin-bottom: 0.75rem;
`;

const Standard = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.text.secondary};
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
      return props.value ? props.theme.status.success : props.theme.status.error;
    }
    return props.theme.components.button.secondary;
  }};
  color: ${props => {
    if (props.selected) {
      return props.value ? props.theme.status.successText : props.theme.status.errorText;
    }
    return props.theme.text.primary;
  }};
  border: 1px solid ${props => {
    if (props.selected) {
      return props.value ? props.theme.primary.light : '#ef9a9a';
    }
    return props.theme.grey.medium;
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
      return props.theme.components.button.hover.secondary;
    }};
  }
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.secondary.main};
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
  background-color: ${props => props.theme.components.infoPanel.background};
  border-radius: 4px;
  padding: 1rem;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const InfoTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.components.infoPanel.title};
`;

const InfoText = styled.div`
  color: ${props => props.theme.text.primary};
`;

const Question = memo(({ question, answer, onChange }) => {
  const [showInfo, setShowInfo] = useState(false);
  
  const handleOptionClick = (value, e) => {
    // Prevent event from bubbling up to parent containers
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    onChange(value);
  };
  
  const toggleInfo = (e) => {
    // Prevent event from bubbling up to parent containers
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setShowInfo(prev => !prev);
  };
  
  return (
    <QuestionContainer onClick={(e) => e.stopPropagation()}>
      <QuestionText>{question.text}</QuestionText>
      <Standard>Standard: {question.standard}</Standard>
      
      <OptionsContainer showInfo={showInfo}>
        <Option 
          selected={answer === true} 
          value={true}
          onClick={(e) => handleOptionClick(true, e)}
        >
          JA
        </Option>
        <Option 
          selected={answer === false} 
          value={false}
          onClick={(e) => handleOptionClick(false, e)}
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
});

export default Question;