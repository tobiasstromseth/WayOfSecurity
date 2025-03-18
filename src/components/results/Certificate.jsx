import React from 'react';
import { motion } from 'framer-motion';

const Certificate = ({ score, date }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-10 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-lg p-10 text-center relative"
    >
      <h3 className="text-2xl font-bold text-blue-900 mb-4">
        Security Shield Certificate
      </h3>
      
      <p className="mb-2">
        This certifies that your business has completed a comprehensive cybersecurity assessment
      </p>
      
      <div className="my-6 py-2 border-t border-b border-blue-300">
        <p className="text-lg font-semibold">
          <span className="mr-2">Security Score:</span>
          <span className={`text-2xl ${
            score < 40 ? 'text-red-600' : 
            score < 70 ? 'text-yellow-600' : 
            'text-green-600'
          }`}>
            {score}%
          </span>
        </p>
      </div>
      
      <p className="mb-6">
        <strong>Date:</strong> {date}
      </p>
      
      <div className="absolute right-8 bottom-8 w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center text-white transform -rotate-12">
        <div className="text-xs font-bold text-center">
          SECURITY<br />VERIFIED
        </div>
      </div>
      
      <div className="text-left mt-6 text-sm text-gray-600">
        <p>
          This assessment identifies your current security posture and provides 
          recommendations for improving your cybersecurity. It does not guarantee 
          protection against all cyber threats. Regular assessments and implementing 
          the recommended actions will help reduce your risk.
        </p>
      </div>
    </motion.div>
  );
};

export default Certificate;