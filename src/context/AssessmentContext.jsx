import React, { createContext, useState, useEffect } from 'react';
import { categories } from '../data/categories';
import { questions } from '../data/questions';

export const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});
  const [securityScore, setSecurityScore] = useState(0);
  const [focusedCategory, setFocusedCategory] = useState(null);
  const [completedCategories, setCompletedCategories] = useState([]);
  
  // Initialize answers structure
  useEffect(() => {
    const initialAnswers = {};
    categories.forEach(category => {
      initialAnswers[category.id] = {};
      questions.filter(q => q.categoryId === category.id).forEach(question => {
        initialAnswers[category.id][question.id] = null;
      });
    });
    setAnswers(initialAnswers);
  }, []);

  // Calculate security score when answers change
  useEffect(() => {
    const calculateScore = () => {
      let totalQuestions = 0;
      let answeredCorrectly = 0;
      
      Object.keys(answers).forEach(categoryId => {
        Object.keys(answers[categoryId]).forEach(questionId => {
          totalQuestions++;
          if (answers[categoryId][questionId] === true) {
            answeredCorrectly++;
          }
        });
      });
      
      return totalQuestions > 0 ? Math.round((answeredCorrectly / totalQuestions) * 100) : 0;
    };
    
    setSecurityScore(calculateScore());
    
    // Update completed categories
    const completed = categories
      .filter(category => {
        const categoryQuestions = questions.filter(q => q.categoryId === category.id);
        const categoryAnswered = categoryQuestions.every(
          question => answers[category.id]?.[question.id] !== null
        );
        return categoryAnswered;
      })
      .map(category => category.id);
    
    setCompletedCategories(completed);
  }, [answers]);

  const updateAnswer = (categoryId, questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [questionId]: value
      }
    }));
  };

  const getCategoryStatus = (categoryId) => {
    const categoryQuestions = questions.filter(q => q.categoryId === categoryId);
    const answeredQuestions = categoryQuestions.filter(
      question => answers[categoryId]?.[question.id] !== null
    );
    
    const fulfilledQuestions = categoryQuestions.filter(
      question => answers[categoryId]?.[question.id] === true
    );
    
    return {
      total: categoryQuestions.length,
      answered: answeredQuestions.length,
      fulfilled: fulfilledQuestions.length
    };
  };

  const isAssessmentComplete = () => {
    return completedCategories.length === categories.length;
  };

  const value = {
    answers,
    updateAnswer,
    securityScore,
    focusedCategory,
    setFocusedCategory,
    getCategoryStatus,
    completedCategories,
    isAssessmentComplete
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};