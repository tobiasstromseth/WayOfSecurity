import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentContext } from '../../context/AssessmentContext';
import { categories } from '../../data/categories';
import { categoryIcons } from '../../data/categories';
import RecommendationDetail from '../common/RecommendationDetail';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  perspective: 1000px;
`;

const FlipContainer = styled(motion.div)`
  transform-style: preserve-3d;
  width: 100%;
`;

const FlippedContent = styled.div`
  backface-visibility: hidden;
  transform: rotateY(180deg);
  position: relative;
  width: 100%;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.text.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ScoreDisplay = styled.div`
  background-color: ${props => {
    if (props.score >= 80) return props.theme.status.success;
    if (props.score >= 50) return props.theme.status.warning;
    return props.theme.status.error;
  }};
  border-radius: 50px;
  width: 200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => {
    if (props.score >= 80) return props.theme.status.successText;
    if (props.score >= 50) return props.theme.status.warningText;
    return props.theme.status.errorText;
  }};
`;

const ScoreMessage = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: ${props => props.theme.text.secondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const ResultsCard = styled.div`
  background-color: ${props => {
    if (props.fulfilled === props.total) return '#e8f5e9';
    if (props.fulfilled > 0) return '#fff9c4';
    return '#ffebee';
  }};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.15);
  }
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  color: #333;
`;

const CardTitle = styled.h3`
  margin: 0;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #333;
`;

const ScoreBar = styled.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ScoreFill = styled.div`
  height: 100%;
  width: ${props => (props.fulfilled / props.total) * 100}%;
  background-color: ${props => {
    if (props.fulfilled === props.total) return '#4CAF50';
    if (props.fulfilled > 0) return '#FFC107';
    return '#F44336';
  }};
`;

const ScoreText = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
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
`;

const ResultsPage = () => {
  const { securityScore, getCategoryStatus } = useContext(AssessmentContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Animate the page flip when component mounts
    setTimeout(() => {
      setFlipped(true);
    }, 500);
  }, []);
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleCloseDetail = () => {
    setSelectedCategory(null);
  };
  
  const handleRestart = () => {
    // This would ideally reset the assessment state
    navigate('/');
  };
  
  const getScoreMessage = (score) => {
    if (score >= 80) return 'Utmerket! Din bedrift har en sterk sikkerhetsposisjon.';
    if (score >= 60) return 'Bra! Din bedrift har en god grunnleggende sikkerhet, men har rom for forbedring.';
    if (score >= 40) return 'Moderat. Det er flere områder som trenger forbedring for å styrke sikkerheten.';
    return 'Svak. Din bedrift har betydelige sikkerhetshull som bør adresseres umiddelbart.';
  };
  
  return (
    <PageContainer>
      <FlipContainer
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 1 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <FlippedContent>
          <Header>
            <Title>Anbefalte sikkerhetstiltak</Title>
            <ScoreDisplay score={securityScore}>Din score: {securityScore}/100</ScoreDisplay>
            <ScoreMessage>{getScoreMessage(securityScore)}</ScoreMessage>
          </Header>
          
          <Grid>
            {categories.map(category => {
              const status = getCategoryStatus(category.id);
              const icon = categoryIcons[category.icon] || null;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 + Math.random() * 0.5 }}
                >
                  <ResultsCard 
                    fulfilled={status.fulfilled}
                    total={status.total}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <IconContainer>{icon}</IconContainer>
                    <CardTitle>{category.name}</CardTitle>
                    
                    <ScoreBar>
                      <ScoreFill 
                        fulfilled={status.fulfilled} 
                        total={status.total} 
                      />
                    </ScoreBar>
                    
                    <ScoreText>{status.fulfilled} av {status.total} tiltak oppfylt</ScoreText>
                  </ResultsCard>
                </motion.div>
              );
            })}
          </Grid>
          
          <ButtonContainer>
            <ActionButton onClick={handleRestart}>Start ny vurdering</ActionButton>
            <ActionButton primary onClick={() => window.print()}>Skriv ut resultater</ActionButton>
          </ButtonContainer>
        </FlippedContent>
      </FlipContainer>
      
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <RecommendationDetail 
            categoryId={selectedCategory}
            status={getCategoryStatus(selectedCategory)}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default ResultsPage;