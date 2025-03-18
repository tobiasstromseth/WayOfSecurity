import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentContext } from '../../context/AssessmentContext';
import Question from './Question';

const CategoryCard = ({ category, isOpen, onOpen, onClose }) => {
  const { categories, currentMode, toggleAction } = useContext(AssessmentContext);
  
  const categoryData = categories[category.id];
  const isComplete = currentMode === 'questions' 
    ? categoryData.questionCompleted 
    : categoryData.actions.completed === categoryData.actions.total;
  
  // Card animations
  const cardVariants = {
    closed: { 
      scale: 1,
      zIndex: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    open: { 
      scale: 1.05,
      zIndex: 50,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  };
  
  return (
    <motion.div
      className={`rounded-lg overflow-hidden bg-white ${
        isComplete ? 'border-2 border-green-500' : ''
      }`}
      variants={cardVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 0.2 }}
      layoutId={`card-container-${category.id}`}
    >
      {/* Card Header - Always visible */}
      <div 
        className="flex items-center p-4 bg-blue-50 cursor-pointer"
        onClick={isOpen ? onClose : onOpen}
      >
        <div className="w-12 h-12 mr-4 bg-white rounded-full flex items-center justify-center text-2xl text-blue-600">
          {category.icon}
        </div>
        <h3 className="font-bold">{category.title}</h3>
        <div 
          className={`ml-auto w-4 h-4 rounded-full ${
            isComplete ? 'bg-green-500' : 'bg-gray-300'
          }`}
        ></div>
      </div>
      
      {/* Card Content - Visible when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            <p className="mb-4 text-gray-700">{category.description}</p>
            
            {currentMode === 'questions' ? (
              // Questions section
              <div>
                <Question 
                  question={category.questions[0]} 
                  categoryId={category.id} 
                  selectedOptionIndex={categoryData.selectedOptionIndex}
                />
              </div>
            ) : (
              // Actions section
              <div>
                <h4 className="font-semibold mb-2 text-blue-800">Recommended Actions:</h4>
                <div className="space-y-2 mb-4">
                  {category.actions.map((action, index) => (
                    <div 
                      key={index}
                      className="flex items-start p-3 bg-gray-50 hover:bg-blue-50 rounded transition-colors"
                    >
                      <input 
                        type="checkbox" 
                        className="mt-1 mr-3"
                        checked={categoryData.actions.items[index]?.completed || false}
                        onChange={() => toggleAction(category.id, index)}
                        id={`action-${category.id}-${index}`}
                      />
                      <label 
                        htmlFor={`action-${category.id}-${index}`}
                        className="cursor-pointer"
                      >
                        {action}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="text-right text-sm font-semibold text-blue-800">
                  {categoryData.actions.completed}/{categoryData.actions.total} actions completed
                </div>
              </div>
            )}
            
            <div className="mt-4 flex justify-end">
              <button 
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CategoryCard;