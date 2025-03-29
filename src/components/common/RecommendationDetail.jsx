import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { categories, categoryIcons } from '../../data/categories';
import { recommendations } from '../../data/questions';
import ModalPortal from './ModalPortal/ModalPortal';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: auto;
`;

const DetailContainer = styled(motion.div)`
  width: 90%;
  max-width: 800px;
  height: fit-content;
  max-height: 90vh;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 10000;
  overflow: hidden;
  position: relative;
  margin: 0 auto; /* Ensure horizontal centering */
  
  @media (max-width: 768px) {
    width: 95%;
    max-height: 95vh;
    padding: 0.75rem;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-bottom: 0.5rem;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  color: #333;
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const ScoreBar = styled.div`
  height: 8px;
  width: 200px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 0 1rem;
  overflow: hidden;
`;

const ScoreFill = styled.div`
  height: 100%;
  width: ${props => (props.fulfilled / props.total) * 100}%;
  background-color: ${props => {
    if (props.fulfilled === props.total) return props.theme.status.successFill;
    if (props.fulfilled > 0) return props.theme.status.warningFill;
    return props.theme.status.errorFill;
  }};
`;

const ScoreText = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const RecommendationsList = styled.ul`
  padding-left: 1.5rem;
  margin-top: 1rem;
  
  li {
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#4CAF50' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.primary ? '#45a049' : '#e0e0e0'};
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const Description = styled.p`
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const RecommendationDetail = ({ categoryId, status, onClose }) => {
  const recommendation = recommendations[categoryId];
  const category = categories.find(c => c.id === categoryId);
  const icon = category ? categoryIcons[category.icon] : null;
  
  if (!recommendation) return null;
  
  return (
    <ModalPortal>
      <Overlay 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <DetailContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
        <DetailHeader>
          <Title>{recommendation.title}</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </DetailHeader>
        
        <ContentContainer>
          {icon && (
            <IconContainer>{icon}</IconContainer>
          )}
          
          <ScoreDisplay>
            <ScoreText>Oppfylt:</ScoreText>
            <ScoreBar>
              <ScoreFill 
                fulfilled={status.fulfilled} 
                total={status.total}
              />
            </ScoreBar>
            <ScoreText>{status.fulfilled} av {status.total}</ScoreText>
          </ScoreDisplay>
          
          <Description>
            Her er anbefalte tiltak for å forbedre sikkerheten innen {recommendation.title.toLowerCase()}:
          </Description>
          
          <RecommendationsList>
            {recommendation.actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </RecommendationsList>
        </ContentContainer>
        
        <CloseButtonContainer>
          <ActionButton onClick={onClose}>Lukk</ActionButton>
        </CloseButtonContainer>
              </DetailContainer>
      </Overlay>
    </ModalPortal>
  );
};

export default RecommendationDetail;