import React from 'react';
import { statistics } from '../../data/categories';

const StatisticsBar = () => {
  return (
    <div className="bg-blue-700 bg-opacity-90 py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-around text-center">
          {statistics.map((stat, index) => (
            <div key={index} className="px-4 py-2 flex-1 min-w-64">
              <span className="block text-3xl font-bold mb-1">{stat.value}</span>
              <span className="text-sm md:text-base">{stat.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;