import React, { useContext, useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AssessmentContext } from '../../../context/AssessmentContext';
import { questions } from '../../../data/questions';
import { categories, categoryIcons } from '../../../data/categories';
import Question from '../Question';
import ModalPortal from '../ModalPortal';

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
  background-color: ${props => props.theme.background.modal};
  border-radius: 12px;
  box-shadow: 0 10px 25px ${props => props.theme.components.card.activeShadow};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  z-index: 10000;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    width: 95%;
    max-height: 95vh;
    padding: 1rem;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.components.divider.main};
  padding-bottom: 1rem;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  margin-right: 1rem;
  color: ${props => props.theme.brand.main};
`;

const Title = styled.h2`
  margin: 0;
  color: ${props => props.theme.text.primary};
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.text.secondary};
  
  &:hover {
    color: ${props => props.theme.text.primary};
  }
`;

const QuestionsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-bottom: 1rem;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.grey.light};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.grey.medium};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.grey.dark};
  }
`;

const QuestionsHeader = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionsTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.brand.main};
`;

const QuestionsStatus = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.text.secondary};
  background-color: ${props => props.theme.grey.light};
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
`;

const Description = styled.p`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text.secondary};
  line-height: 1.5;
`;

const NoQuestionsMessage = styled.div`
  padding: 2rem;
  text-align: center;
  background-color: ${props => props.theme.grey.lightest};
  border-radius: 8px;
  color: ${props => props.theme.text.secondary};
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  border-top: 1px solid ${props => props.theme.components.divider.main};
  padding-top: 1rem;
`;

const CategoryStatus = styled.div`
  font-size: 0.9rem;
  color: ${props => props.isComplete ? props.theme.brand.main : props.theme.text.secondary};
  font-weight: ${props => props.isComplete ? 'bold' : 'normal'};
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? props.theme.components.button.primary : props.theme.components.button.secondary};
  color: ${props => props.primary ? props.theme.text.light : props.theme.text.primary};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.primary ? props.theme.components.button.hover.primary : props.theme.components.button.hover.secondary};
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const CategoryDetail = memo(({ categoryId, onClose, standalone = false }) => {
  const { updateAnswer, answers, getCategoryStatus, completedCategories } = useContext(AssessmentContext);
  const [internalState, setInternalState] = useState({});
  
  const category = categories.find(c => c.id === categoryId);
  
  // Get questions directly for this category
  const categoryQuestions = questions.filter(q => q.categoryId === categoryId);
  
  // Get status directly from the Assessment context
  const status = getCategoryStatus(categoryId);
  
  const isComplete = completedCategories.includes(categoryId);
  
  // Initialize internal state from context
  useEffect(() => {
    if (categoryId && answers[categoryId]) {
      setInternalState(answers[categoryId]);
    }
  }, [categoryId, answers]);
  
  const handleAnswerChange = (questionId, value) => {
    // First update internal state to prevent flicker
    setInternalState(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Then update the context state
    updateAnswer(categoryId, questionId, value);
  };
  
  const handleStopPropagation = (e) => {
    if (e) e.stopPropagation();
  };
  
  if (!category) return null;
  
  const icon = categoryIcons[category.icon] || null;
  
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
          onClick={handleStopPropagation}
        >
          <DetailHeader>
            <HeaderContent>
              {icon && <IconContainer>{icon}</IconContainer>}
              <Title>{category.name}</Title>
            </HeaderContent>
            <CloseButton onClick={onClose}>×</CloseButton>
          </DetailHeader>
          
          <Description>{category.description}</Description>
          
          <QuestionsContainer>
            <QuestionsHeader>
              <QuestionsTitle>Spørsmål</QuestionsTitle>
              <QuestionsStatus>
                {status.answered} av {status.total} besvart
              </QuestionsStatus>
            </QuestionsHeader>
            
            {categoryQuestions.length > 0 ? (
              categoryQuestions.map(question => (
                <Question
                  key={question.id}
                  question={question}
                  // Use internal state first, fall back to context state
                  answer={internalState[question.id] !== undefined ? 
                    internalState[question.id] : 
                    answers[categoryId]?.[question.id]}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                />
              ))
            ) : (
              <NoQuestionsMessage>
                Ingen spørsmål er tilgjengelig for denne kategorien ennå.
              </NoQuestionsMessage>
            )}
          </QuestionsContainer>
          
          <CloseButtonContainer>
            <CategoryStatus isComplete={isComplete}>
              {isComplete ? 'Kategori fullført' : `${status.answered} av ${status.total} spørsmål besvart`}
            </CategoryStatus>
            <ActionButton primary onClick={onClose}>Lukk kategori</ActionButton>
          </CloseButtonContainer>
        </DetailContainer>
      </Overlay>
    </ModalPortal>
  );
});

export default CategoryDetail;