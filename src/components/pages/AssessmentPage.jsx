import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentContext } from '../../context/AssessmentContext';
import { categories } from '../../data/categories';
import CategoryCard from '../common/CategoryCard';
import CategoryDetail from '../common/CategoryDetail';

const PageContainer = styled.div`
  max-width: 1200px;
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
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ScoreDisplay = styled.div`
  background-color: #f5f5f5;
  border-radius: 50px;
  width: 200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`;

const ProgressIndicator = styled.div`
  margin: 1rem 0;
  text-align: center;
  color: #666;
  font-size: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#4CAF50' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &:hover {
    background-color: ${props => props.primary ? '#45a049' : '#e0e0e0'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const AssessmentPage = () => {
  const { 
    securityScore, 
    completedCategories, 
    isAssessmentComplete
  } = useContext(AssessmentContext);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleCloseDetail = () => {
    setSelectedCategory(null);
  };
  
  const handleNext = () => {
    navigate('/results');
  };
  
  // Calculate progress
  const progress = Math.round((completedCategories.length / categories.length) * 100);
  
  return (
    <PageContainer>
      <Header>
        <Title>Basline cybsikk lightweight</Title>
        <ScoreDisplay>Din score: {securityScore}/100</ScoreDisplay>
        <ProgressIndicator>
          Kategorier gjennomført: {completedCategories.length}/{categories.length} ({progress}%)
        </ProgressIndicator>
      </Header>
      
      <Grid>
        {categories.map(category => (
          <motion.div
            key={category.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryCard 
              category={category}
              onClick={handleCategoryClick}
              isActive={selectedCategory === category.id}
            />
          </motion.div>
        ))}
      </Grid>
      
      <ButtonContainer>
        <ActionButton 
          primary
          onClick={handleNext}
          disabled={!isAssessmentComplete()}
        >
          {isAssessmentComplete() 
            ? "Se anbefalte tiltak" 
            : `Fullfør alle ${categories.length} kategorier for å fortsette`}
        </ActionButton>
      </ButtonContainer>
      
      <AnimatePresence>
        {selectedCategory && (
          <CategoryDetail 
            categoryId={selectedCategory}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default AssessmentPage;