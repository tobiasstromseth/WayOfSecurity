import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AssessmentContext } from '../../context/AssessmentContext';
import { categories, categoryIcons } from '../../data/categories';
import CategoryDetail from '../common/Category/CategoryDetail';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  background-color: ${props => props.theme.brand.main};
  padding: 2rem;
  color: ${props => props.theme.text.light};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TitleContainer = styled.div`
  flex: 3;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0;
  line-height: 1.1;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeaderDescription = styled.p`
  margin-top: 1rem;
  line-height: 1.5;
  max-width: 600px;
`;

const VikingsContainer = styled.div`
  flex: 1;
  text-align: right;
`;

// This grid will adapt to screen size, with a minimum width for cards
const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem 2rem 2rem;
`;

const CategoryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 0.5rem;
  color: #333;
`;

const CategoryDescription = styled.p`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StatusIndicator = styled.div`
  margin-top: auto;
  width: 100%;
  font-size: 0.8rem;
  padding: 0.4rem;
  background-color: #f5f5f5;
  border-radius: 20px;
  text-align: center;
  color: ${props => props.isComplete ? '#28604B' : '#666'};
  font-weight: ${props => props.isComplete ? 'bold' : 'normal'};
`;

// This container will handle both the grid and the dividers
const CategoriesContainer = styled.div`
  position: relative;
  width: 100%;
`;

const WavyDivider = styled.div`
  height: 20px;
  width: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='20px' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 C30,20 70,0 100,10 L100,00 L0,0 Z' fill='%23f5f5f5'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  margin: 1.5rem 0;
  grid-column: 1 / -1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#28604B' : '#f0f0f0'};
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
    background-color: ${props => props.primary ? '#1e4d3b' : '#e0e0e0'};
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

const StatusBar = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
`;

const ProgressBar = styled.div`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 0.5rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #28604B;
  border-radius: 5px;
  transition: width 0.5s ease;
`;

const AssessmentPage = () => {
  const { 
    securityScore, 
    completedCategories, 
    isAssessmentComplete,
    getCategoryStatus
  } = useContext(AssessmentContext);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const cardsRef = useRef([]);
  const navigate = useNavigate();
  
  // Calculate the rows and set dividers after each row except the last
  useEffect(() => {
    const calculateRows = () => {
      if (!cardsRef.current.length) return;
      
      // Get all card elements
      const cards = cardsRef.current.filter(ref => ref);
      if (!cards.length) return;
      
      // Initialize with first card's top position
      let currentRowTop = cards[0]?.getBoundingClientRect().top;
      let rows = [];
      let currentRow = [];
      
      // Group cards into rows based on their Y position
      cards.forEach((card, index) => {
        const { top } = card.getBoundingClientRect();
        
        // If this card is on a new row
        if (Math.abs(top - currentRowTop) > 10) {
          rows.push([...currentRow]);
          currentRow = [index];
          currentRowTop = top;
        } else {
          currentRow.push(index);
        }
      });
      
      // Add the last row
      if (currentRow.length) {
        rows.push([...currentRow]);
      }
      
      // Calculate where dividers should be (after each row except the last)
      const newVisibleRows = rows.slice(0, -1).map(row => row[row.length - 1]);
      setVisibleRows(newVisibleRows);
    };
    
    // Initial calculation
    calculateRows();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateRows);
    
    return () => {
      window.removeEventListener('resize', calculateRows);
    };
  }, [categories.length]);
  
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
  
  // Set up refs for all cards
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, categories.length);
  }, [categories.length]);
  
  return (
    <PageContainer>
      <Header>
        <TitleContainer>
          <Title>12 VEIER TIL SIKKERHET</Title>
          <HeaderDescription>
            Dette verktøyet kombinerer ledende cybersikkerhets-standarder fra CIS, NSM og NIST i en brukervennlig løsning for små bedrifter uten IT-ekspertise. Det forener teori med praktiske tiltak for rask risikoidentifisering og konkrete forbedringer.
          </HeaderDescription>
        </TitleContainer>
        <VikingsContainer>
          {/* This would be replaced with the actual viking illustrations from your design */}
          <div style={{ fontSize: '40px' }}>👨‍🦰👨‍🦱👨‍🦳</div>
        </VikingsContainer>
      </Header>
      
      <StatusBar>
        <div>Kategorier gjennomført: {completedCategories.length}/{categories.length}</div>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <div>Din sikkerhetsscore: {securityScore}/100</div>
      </StatusBar>
      
      <CategoriesContainer>
        <CategoriesGrid>
          {categories.map((category, index) => {
            const status = getCategoryStatus(category.id);
            const isComplete = completedCategories.includes(category.id);
            const shouldShowDivider = visibleRows.includes(index);
            
            return (
              <React.Fragment key={category.id}>
                <motion.div
                  ref={el => cardsRef.current[index] = el}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CategoryCard onClick={() => handleCategoryClick(category.id)}>
                    <IconContainer>
                      {categoryIcons[category.icon]}
                    </IconContainer>
                    <CategoryTitle>{category.name}</CategoryTitle>
                    <CategoryDescription>
                      {category.description}
                    </CategoryDescription>
                    <StatusIndicator isComplete={isComplete}>
                      {status.answered}/{status.total} spørsmål besvart
                    </StatusIndicator>
                  </CategoryCard>
                </motion.div>
                
                {shouldShowDivider && <WavyDivider />}
              </React.Fragment>
            );
          })}
        </CategoriesGrid>
      </CategoriesContainer>
      
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
      
      {/* Render CategoryDetail if there is a selectedCategory */}
      {selectedCategory && (
        <CategoryDetail 
          categoryId={selectedCategory}
          onClose={handleCloseDetail}
          standalone={true}
        />
      )}
    </PageContainer>
  );
};

export default AssessmentPage;