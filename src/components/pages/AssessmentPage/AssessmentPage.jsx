import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AssessmentContext } from '../../../context/AssessmentContext';
import { categoryIcons } from '../../../data/categories';
import Header from '../../common/Header/Header';
import Background from '../../common/SpritesLoader/BackgroundSprites';
import { useNeo4j } from '../../../context/Neo4jContext';
import './AssessmentPage.css';
import ModalPortal from '../../common/ModalPortal';
import Question from '../../common/Question';
import styled from 'styled-components';

// =================== Styled components for modal ================
const Overlay = styled.div`
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

const DetailContainer = styled.div`
  width: 90%;
  max-width: 800px;
  height: fit-content;
  max-height: 90vh;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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
  border-bottom: 1px solid #eee;
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
  color: #4CAF50;
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
  margin-bottom: 1rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
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
  color: #4CAF50;
`;

const QuestionsStatus = styled.div`
  font-size: 0.9rem;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
`;

const Description = styled.p`
  margin-bottom: 1.5rem;
  color: #666;
  line-height: 1.5;
`;

const NoQuestionsMessage = styled.div`
  padding: 2rem;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  color: #666;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const CategoryStatus = styled.div`
  font-size: 0.9rem;
  color: ${props => props.isComplete ? '#4CAF50' : '#666'};
  font-weight: ${props => props.isComplete ? 'bold' : 'normal'};
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#4CAF50' : '#f0f0f0'};
  color: ${props => props.primary ? '#fff' : '#333'};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.primary ? '#3e8e41' : '#e0e0e0'};
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

// Custom Neo4j-compatible CategoryDetail component 
const Neo4jCategoryDetail = ({ 
  categoryData, 
  onClose, 
  standalone = false,
  answers,
  updateAnswer,
  completedCategories 
}) => {
  const [internalState, setInternalState] = useState({});

  // Get category info from the card data
  const categoryId = categoryData.id?.toString();
  const categoryName = categoryData.category?.text || 'Unnamed Category';
  const categoryDescription = categoryData.category?.description || '';
  
  // Extract questions from Neo4j data
  const questions = categoryData.alternatives?.map((alt, index) => ({
    id: `${categoryId}_q${index}`,
    categoryId: categoryId,
    text: alt.text || `Question ${index + 1}`,
    standard: 'Neo4j Standard',
    explanation: alt.description || 'No explanation available',
    what: alt.what || '',
    how: alt.how || ''
  })) || [];
  
  // Initialize internal state from answers
  useEffect(() => {
    if (categoryId && answers[categoryId]) {
      setInternalState(answers[categoryId]);
    }
  }, [categoryId, answers]);
  
  // Calculate status metrics
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(internalState).length;
  const isComplete = completedCategories.includes(categoryId);
  
  // Handle answer changes
  const handleAnswerChange = (questionId, value) => {
    // Update internal state
    setInternalState(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Update context state
    updateAnswer(categoryId, questionId, value);
  };
  
  const handleStopPropagation = (e) => {
    if (e) e.stopPropagation();
  };
  
  // Find appropriate icon
  const icon = categoryIcons[Object.keys(categoryIcons)[Math.floor(Math.random() * Object.keys(categoryIcons).length)]];

  return (
    <ModalPortal>
      <Overlay onClick={onClose}>
        <DetailContainer onClick={handleStopPropagation}>
          <DetailHeader>
            <HeaderContent>
              {icon && <IconContainer>{icon}</IconContainer>}
              <Title>{categoryName}</Title>
            </HeaderContent>
            <CloseButton onClick={onClose}>×</CloseButton>
          </DetailHeader>
          
          <Description>{categoryDescription}</Description>
          
          <QuestionsContainer>
            <QuestionsHeader>
              <QuestionsTitle>Alternativer</QuestionsTitle>
              <QuestionsStatus>
                {answeredQuestions} av {totalQuestions} besvart
              </QuestionsStatus>
            </QuestionsHeader>
            
            {questions.length > 0 ? (
              questions.map(question => (
                <div key={question.id} className="neo4j-question">
                  <div className="question-text">{question.text}</div>
                  <div className="question-check">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={internalState[question.id] === true}
                        onChange={(e) => handleAnswerChange(question.id, e.target.checked)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  {question.explanation && (
                    <div className="question-explanation">
                      <strong>Beskrivelse:</strong> {question.explanation}
                    </div>
                  )}
                  {question.what && (
                    <div className="question-what">
                      <strong>Hva:</strong> {question.what}
                    </div>
                  )}
                  {question.how && (
                    <div className="question-how">
                      <strong>Hvordan:</strong> {question.how}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <NoQuestionsMessage>
                Ingen alternativer er tilgjengelig for denne kategorien ennå.
              </NoQuestionsMessage>
            )}
          </QuestionsContainer>
          
          <CloseButtonContainer>
            <CategoryStatus isComplete={isComplete}>
              {isComplete ? 'Kategori fullført' : `${answeredQuestions} av ${totalQuestions} alternativer besvart`}
            </CategoryStatus>
            <ActionButton primary onClick={onClose}>Lukk kategori</ActionButton>
          </CloseButtonContainer>
        </DetailContainer>
      </Overlay>
    </ModalPortal>
  );
};

// Main AssessmentPage component
const AssessmentPage = () => {
  const { 
    answers, 
    updateAnswer,
    securityScore, 
    completedCategories, 
    isAssessmentComplete,
    getCategoryStatus
  } = useContext(AssessmentContext);

  const cardColors = [
    'var(--blue)',
    'var(--purple)',
  ];
  
  // Function to select a random color
  const getRandomColor = () => {
    return cardColors[Math.floor(Math.random() * cardColors.length)];
  };
  
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();
  
  const { dbQueries, isConnected, isInitializing, connectionError } = useNeo4j();
  
  // Fetch data from Neo4j database
  const fetchData = useCallback(async () => {
    console.log("Fetching data from Neo4j...");
    if (isInitializing) return;
    
    if (!isConnected || connectionError) {
      setError(`Database connection error: ${connectionError}`);
      setLoading(false);
      return;
    }
    
    if (!dbQueries) {
      setError("Database queries are not available");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Get all category IDs
      const categoryIds = await dbQueries.getAllCategoryIds();
      console.log("Fetched category IDs:", categoryIds);
      
      const fetchedCards = [];
      
      // Process each category ID
      for (const categoryId of categoryIds) {
        try {
          const cardsData = await dbQueries.getCardById(categoryId);
          console.log(`Fetched data for category ${categoryId}:`, cardsData?.length || 0, "records");
          
          if (cardsData && cardsData.length > 0) {
            const firstRecord = cardsData[0].toObject();
            
            // Extract all alternatives from all records for this card
            const alternatives = [];
            const uniqueAlts = new Set();
            
            cardsData.forEach(record => {
              const data = record.toObject();
              const altText = data.alternativ_tekst;
              
              // Only add unique alternatives
              if (altText && !uniqueAlts.has(altText)) {
                uniqueAlts.add(altText);
                alternatives.push({
                  text: altText,
                  description: data.alternativ_beskrivelse,
                  what: data.alternativ_hva,
                  how: data.alternativ_hvordan
                });
              }
            });
            
            // Create a card object with category, question, and alternatives
            const card = {
              id: categoryId,
              category: {
                id: categoryId,
                text: firstRecord.kategori_tekst,
                description: firstRecord.kategori_beskrivelse
              },
              question: {
                text: firstRecord.sporsmal_tekst
              },
              alternatives: alternatives
            };
            
            fetchedCards.push(card);
          }
        } catch (error) {
          console.error(`Error fetching card for category ID ${categoryId}:`, error);
        }
      }
      
      console.log("Total cards fetched:", fetchedCards.length);
      setCards(fetchedCards);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [dbQueries, isConnected, isInitializing, connectionError]);
  
  // Run fetchData when necessary
  useEffect(() => {
    if (dbQueries && isConnected && !isInitializing) {
      fetchData();
    }
  }, [dbQueries, isConnected, isInitializing, fetchData]);
  
  useEffect(() => {
    const calculateRows = () => {
      if (!cardsRef.current.length) return;
      
      const cards = cardsRef.current.filter(ref => ref);
      if (!cards.length) return;
      
      let currentRowTop = cards[0]?.getBoundingClientRect().top;
      let rows = [];
      let currentRow = [];
      
      cards.forEach((card, index) => {
        const { top } = card.getBoundingClientRect();
        
        if (Math.abs(top - currentRowTop) > 10) {
          rows.push([...currentRow]);
          currentRow = [index];
          currentRowTop = top;
        } else {
          currentRow.push(index);
        }
      });
      
      if (currentRow.length) {
        rows.push([...currentRow]);
      }
      
      const newVisibleRows = rows.slice(0, -1).map(row => row[row.length - 1]);
      setVisibleRows(newVisibleRows);
    };
    
    calculateRows();
    window.addEventListener('resize', calculateRows);
    
    return () => {
      window.removeEventListener('resize', calculateRows);
    };
  }, [cards.length]);
  
  const handleCategoryClick = (card) => {
    console.log(`Opening category: ${card.id}`, card);
    setSelectedCategoryData(card);
  };
  
  const handleCloseDetail = () => {
    setSelectedCategoryData(null);
  };
  
  const handleNext = () => {
    navigate('/results');
  };
  
  const totalCategories = cards.length;
  const progress = Math.round((completedCategories.length / (totalCategories || 1)) * 100);
  
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, cards.length);
  }, [cards.length]);
  
  // Render content based on loading/error/data state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <p>Laster data fra Neo4j databasen...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="error-container">
          <p>Feil: {error}</p>
          <button onClick={fetchData} className="refresh-button">Prøv igjen</button>
        </div>
      );
    }
    
    if (cards.length === 0) {
      return (
        <div className="empty-container">
          <p>Ingen kategorier funnet. Vennligst sjekk databasetilkoblingen.</p>
          <button onClick={fetchData} className="refresh-button">Prøv igjen</button>
        </div>
      );
    }
    
    return (
      <div className="categories-grid">
        {cards.map((card, index) => {
          const categoryId = card.id?.toString();
          const status = getCategoryStatus(categoryId) || { answered: 0, total: card.alternatives?.length || 0 };
          const isComplete = completedCategories.includes(categoryId);
          const shouldShowDivider = visibleRows.includes(index);
          
          return (
            <React.Fragment key={categoryId || index}>
              <motion.div
                ref={el => cardsRef.current[index] = el}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div 
                  className="category-card" 
                  onClick={() => handleCategoryClick(card)}
                  style={{ backgroundColor: getRandomColor() }}
                >
                  <div className="icon-container">
                    {/* Try to find a matching icon, or use a random one */}
                    {categoryIcons[Object.keys(categoryIcons)[index % Object.keys(categoryIcons).length]]}
                  </div>
                  <h3 className="category-title">{card.category?.text || "Unnamed Category"}</h3>
                  <p className="category-description">
                    {card.category?.description || "No description available"}
                  </p>
                  <div className={`status-indicator ${isComplete ? 'complete' : ''}`}>
                    {status.answered}/{card.alternatives?.length || 0} alternativer besvart
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="page-container">
      <Background numberOfSprites={20} />
      
      <Header /> 
      <div className='content'>
        <div className="status-bar">
          <div>Kategorier gjennomført: {completedCategories.length}/{totalCategories || 0}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="button-container">
            <button 
              className={`action-button ${isAssessmentComplete() ? 'primary' : ''}`}
              onClick={handleNext}
              disabled={!isAssessmentComplete()}
            >
              {isAssessmentComplete() 
                ? "Se anbefalte tiltak" 
                : `Fullfør alle ${totalCategories} kategorier for å fortsette`}
            </button>
          </div>
        </div>
        
        <div className="categories-container">
          {renderContent()}
        </div>
             
        {selectedCategoryData && (
          <Neo4jCategoryDetail 
            categoryData={selectedCategoryData}
            onClose={handleCloseDetail}
            standalone={true}
            answers={answers}
            updateAnswer={updateAnswer}
            completedCategories={completedCategories}
          />
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;