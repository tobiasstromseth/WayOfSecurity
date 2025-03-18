import React, { useContext } from 'react';
import { AssessmentContext } from '../../context/AssessmentContext';

const Question = ({ question, categoryId, selectedOptionIndex }) => {
  const { answerQuestion } = useContext(AssessmentContext);

  const handleOptionSelect = (optionIndex, value) => {
    answerQuestion(categoryId, optionIndex, value);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="font-semibold mb-3">{question.text}</p>
      <div className="flex flex-wrap gap-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded border ${
              selectedOptionIndex === index
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300'
            } transition-colors duration-200`}
            onClick={() => handleOptionSelect(index, option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;