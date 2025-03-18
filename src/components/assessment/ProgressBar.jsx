import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ percentage = 0 }) => {
  // Ensure percentage is between 0 and 100
  const safePercentage = Math.min(Math.max(percentage, 0), 100);
  
  // Color gradient based on percentage
  const getColor = () => {
    if (safePercentage < 30) return 'bg-red-500';
    if (safePercentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="flex items-center">
      <div className="text-3xl font-bold mr-4 w-16 text-center text-blue-800">
        {safePercentage}%
      </div>
      <div className="flex-grow h-8 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${safePercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;