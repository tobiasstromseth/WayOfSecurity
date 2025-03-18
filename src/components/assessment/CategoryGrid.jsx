import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentContext } from '../../context/AssessmentContext';
import { categories } from '../../data/categories';
import CategoryCard from './CategoryCard';
import ProgressBar from './ProgressBar';

const CategoryGrid = () => {
  const navigate = useNavigate();
  const { 
    switchMode, 
    currentMode, 
    completedQuestions,
    overallScore,
    completedActions,
    totalActions,
    showResultsPage
  } = useContext(AssessmentContext);
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [focusedCategory, setFocusedCategory] = useState(null);
  
  const handleCategoryClick = (categoryId) => {
    setFocusedCategory(categoryId);
  };
  
  const handleCloseCategory = () => {
    setFocusedCategory(null);
  };
  
  const handleFlip = () => {
    // First flip the card
    setIsFlipped(true);
    
    // Then switch the mode after animation completes
    setTimeout(() => {
      switchMode(currentMode === 'questions' ? 'actions' : 'questions');
      // Reset flip state for next time
      setTimeout(() => {
        setIsFlipped(false);
      }, 500);
    }, 500);
  };
  
  const handleShowResults = () => {
    navigate('/results');
  };
  
  const categoryIds = Object.keys(categories);
  const totalCategories = categoryIds.length;
  
  // Display measures for the current mode
  const displayProgress = currentMode === 'questions' 
    ? `Categories assessed: ${completedQuestions}/${totalCategories}`
    : `Actions completed: ${completedActions}/${totalActions}`;
  
  // Display score or action percentage
  const displayScore = currentMode === 'questions' 
    ? overallScore
    : Math.round((completedActions / totalActions) * 100) || 0;
  
  const gridContainerVariants = {
    default: { rotateY: 0 },
    flipped: { rotateY: 180 }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Security Progress</h2>
        <p className="text-center mb-3">{displayProgress}</p>
        
        <ProgressBar percentage={displayScore} />
        
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className={`px-4 py-2 rounded ${
              currentMode === 'questions'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => currentMode !== 'questions' && handleFlip()}
          >
            Assessment Mode
          </button>
          
          <button
            className={`px-4 py-2 rounded ${
              currentMode === 'actions'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => currentMode !== 'actions' && handleFlip()}
          >
            Action Mode
          </button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
        variants={gridContainerVariants}
        animate={isFlipped ? 'flipped' : 'default'}
        transition={{ duration: 0.5 }}
      >
        {categoryIds.map((categoryId) => (
          <CategoryCard
            key={categoryId}
            category={categories[categoryId]}
            isOpen={focusedCategory === categoryId}
            onOpen={() => handleCategoryClick(categoryId)}
            onClose={handleCloseCategory}
          />
        ))}
      </motion.div>
      
      <div className="mt-8 text-center">
        <button
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors duration-200"
          onClick={handleShowResults}
        >
          View Detailed Results
        </button>
      </div>
    </div>
  );
};

export default CategoryGrid;