import React, { createContext, useState, useEffect } from 'react';
import { categories } from '../data/categories';

export const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
  // Initialize state with all categories and their default values
  const [assessmentState, setAssessmentState] = useState(() => {
    const savedState = localStorage.getItem('cybersecurityAssessment');
    
    if (savedState) {
      return JSON.parse(savedState);
    }
    
    // Create default state with all categories
    const initialState = {
      categories: {},
      currentMode: 'questions', // 'questions' or 'actions'
      completedQuestions: 0,
      totalQuestions: 0,
      overallScore: 0,
      completedActions: 0,
      totalActions: 0,
      showResults: false
    };
    
    // Initialize each category
    Object.keys(categories).forEach(categoryId => {
      initialState.categories[categoryId] = {
        id: categoryId,
        score: 0,
        questionCompleted: false,
        selectedOptionIndex: null,
        actions: {
          total: categories[categoryId].actions.length,
          completed: 0,
          items: categories[categoryId].actions.map(action => ({
            text: action,
            completed: false
          }))
        }
      };
      initialState.totalQuestions++;
      initialState.totalActions += categories[categoryId].actions.length;
    });
    
    return initialState;
  });
  
  // Save to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('cybersecurityAssessment', JSON.stringify(assessmentState));
  }, [assessmentState]);
  
  // Function to answer a question
  const answerQuestion = (categoryId, optionIndex, score) => {
    setAssessmentState(prevState => {
      const updatedCategories = {
        ...prevState.categories,
        [categoryId]: {
          ...prevState.categories[categoryId],
          score,
          questionCompleted: true,
          selectedOptionIndex: optionIndex
        }
      };
      
      // Calculate how many questions are now completed
      const completedCount = Object.values(updatedCategories).filter(
        cat => cat.questionCompleted
      ).length;
      
      // Calculate overall score
      const totalPossibleScore = Object.keys(updatedCategories).length * 100;
      const currentTotalScore = Object.values(updatedCategories).reduce(
        (sum, cat) => sum + cat.score, 0
      );
      const calculatedScore = Math.round((currentTotalScore / totalPossibleScore) * 100);
      
      return {
        ...prevState,
        categories: updatedCategories,
        completedQuestions: completedCount,
        overallScore: calculatedScore
      };
    });
  };
  
  // Function to toggle action completion
  const toggleAction = (categoryId, actionIndex) => {
    setAssessmentState(prevState => {
      // Create a copy of the category's actions
      const categoryActions = [...prevState.categories[categoryId].actions.items];
      
      // Toggle the specific action
      categoryActions[actionIndex] = {
        ...categoryActions[actionIndex],
        completed: !categoryActions[actionIndex].completed
      };
      
      // Count completed actions for this category
      const completedCount = categoryActions.filter(action => action.completed).length;
      
      // Update the category
      const updatedCategory = {
        ...prevState.categories[categoryId],
        actions: {
          ...prevState.categories[categoryId].actions,
          completed: completedCount,
          items: categoryActions
        }
      };
      
      // Update all categories
      const updatedCategories = {
        ...prevState.categories,
        [categoryId]: updatedCategory
      };
      
      // Calculate total completed actions across all categories
      const totalCompletedActions = Object.values(updatedCategories).reduce(
        (sum, cat) => sum + cat.actions.completed, 0
      );
      
      return {
        ...prevState,
        categories: updatedCategories,
        completedActions: totalCompletedActions
      };
    });
  };
  
  // Function to switch between question mode and action mode
  const switchMode = (mode) => {
    setAssessmentState(prevState => ({
      ...prevState,
      currentMode: mode
    }));
  };
  
  // Function to show results page
  const showResultsPage = () => {
    setAssessmentState(prevState => ({
      ...prevState,
      showResults: true
    }));
  };
  
  // Reset the assessment
  const resetAssessment = () => {
    localStorage.removeItem('cybersecurityAssessment');
    window.location.reload();
  };
  
  return (
    <AssessmentContext.Provider
      value={{
        ...assessmentState,
        answerQuestion,
        toggleAction,
        switchMode,
        showResultsPage,
        resetAssessment
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};