import React, { useContext, useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AssessmentContext } from '../../../context/AssessmentContext';
import { questions } from '../../../data/questions';
import { categories } from '../../../data/categories';
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

const QuestionsContainer = styled.div`
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

const QuestionsHeader = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #444;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
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

const CategoryDetail = memo(({ categoryId, onClose, standalone = false }) => {
  const { updateAnswer, answers, getCategoryStatus } = useContext(AssessmentContext);
  const [internalState, setInternalState] = useState({});
  
  const category = categories.find(c => c.id === categoryId);
  const categoryQuestions = questions.filter(q => q.categoryId === categoryId);
  const status = getCategoryStatus(categoryId);
  
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
            <Title>{category.name}</Title>
            <CloseButton onClick={onClose}>×</CloseButton>
          </DetailHeader>
          
          <QuestionsContainer>
            <QuestionsHeader>
              Spørsmål ({status.answered} av {status.total} besvart)
            </QuestionsHeader>
            
            {categoryQuestions.map(question => (
              <Question
                key={question.id}
                question={question}
                // Use internal state first, fall back to context state
                answer={internalState[question.id] !== undefined ? 
                  internalState[question.id] : 
                  answers[categoryId]?.[question.id]}
                onChange={(value) => handleAnswerChange(question.id, value)}
              />
            ))}
          </QuestionsContainer>
          
          <CloseButtonContainer>
            <ActionButton onClick={onClose}>Lukk kategori</ActionButton>
          </CloseButtonContainer>
        </DetailContainer>
      </Overlay>
    </ModalPortal>
  );
});

export default CategoryDetail;