import React, { useContext } from 'react';
import styled from 'styled-components';
import { categoryIcons } from '../../data/categories';
import { AssessmentContext } from '../../context/AssessmentContext';

const Card = styled.div`
  background-color: ${props => props.isActive ? props.color : props.isCompleted ? '#e8f5e9' : '#fff9c4'};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.isActive ? '#388e3c' : 'transparent'};
  box-shadow: ${props => props.isActive 
    ? '0 8px 16px rgba(0,0,0,0.2)' 
    : '0 2px 4px rgba(0,0,0,0.1)'};
  
  &:hover {
    transform: ${props => props.isActive ? 'scale(1)' : 'scale(1.03)'};
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  color: #333;
`;

const Title = styled.h3`
  margin: 0;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.2rem;
`;

const Status = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${props => props.isCompleted ? '#388e3c' : '#666'};
  font-weight: ${props => props.isCompleted ? 'bold' : 'normal'};
`;

const CategoryCard = ({ category, onClick, isActive }) => {
  const { getCategoryStatus, completedCategories } = useContext(AssessmentContext);
  const status = getCategoryStatus(category.id);
  const isCompleted = completedCategories.includes(category.id);
  
  const icon = categoryIcons[category.icon] || null;
  
  return (
    <Card 
      onClick={() => onClick(category.id)}
      isActive={isActive}
      isCompleted={isCompleted}
      color={category.color}
    >
      <IconContainer>
        {icon}
      </IconContainer>
      <Title>{category.name}</Title>
      <Status isCompleted={isCompleted}>
        {status.answered}/{status.total} spørsmål besvart
      </Status>
    </Card>
  );
};

export default CategoryCard;