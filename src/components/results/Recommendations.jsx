import React from 'react';
import { motion } from 'framer-motion';

const Recommendations = ({ recommendations }) => {
  // Animation variants for list
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return {
          container: 'bg-red-50 border-l-4 border-red-500',
          title: 'text-red-800'
        };
      case 'medium':
        return {
          container: 'bg-yellow-50 border-l-4 border-yellow-500',
          title: 'text-yellow-800'
        };
      case 'low':
        return {
          container: 'bg-green-50 border-l-4 border-green-500',
          title: 'text-green-800'
        };
      default:
        return {
          container: 'bg-gray-50 border-l-4 border-gray-500',
          title: 'text-gray-800'
        };
    }
  };
  
  if (recommendations.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-center">
        <p>Please complete at least one security category assessment to receive recommendations.</p>
      </div>
    );
  }
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {recommendations.map((recommendation) => {
        const styles = getPriorityStyles(recommendation.priority);
        
        return (
          <motion.div
            key={recommendation.id}
            variants={item}
            className={`p-4 rounded-lg ${styles.container}`}
          >
            <div className="flex justify-between items-center mb-1">
              <h4 className={`font-bold ${styles.title}`}>{recommendation.title}</h4>
              <div className={`text-sm px-2 py-1 rounded-full ${
                recommendation.priority === 'high' ? 'bg-red-200 text-red-800' :
                recommendation.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                {recommendation.priority === 'high' ? 'High Priority' :
                 recommendation.priority === 'medium' ? 'Medium Priority' :
                 'Low Priority'}
              </div>
            </div>
            <p>{recommendation.text}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Recommendations;