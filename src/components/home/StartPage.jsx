import React from 'react';
import { Link } from 'react-router-dom';
import StatisticsBar from './StatisticsBar';

const StartPage = () => {
  return (
    <div>
      <StatisticsBar />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Cybersecurity for Small Businesses</h2>
          
          <div className="mb-8">
            <p className="text-lg mb-4">
              Today's businesses are in a world where they're struggling to protect their data and networks 
              which are constantly under fire from cyber threats day in and out.
            </p>
            <p className="text-lg mb-4">
              The nature and sophistication of today's attacks are forcing businesses to implement security 
              in a completely different way than they've approached before in the past. Simply put without 
              the right protection and preventative measures in place, clients won't stand a chance in the 
              ever-changing threat landscape.
            </p>
            <p className="text-lg mb-4">
              This assessment will guide you through 15 critical cybersecurity areas to help identify 
              your strengths and vulnerabilities, providing tailored recommendations to enhance your 
              security posture.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link 
              to="/assessment" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200 text-xl shadow-md"
            >
              Start Your Assessment
            </Link>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4 text-blue-600">🔍</div>
            <h3 className="text-xl font-bold mb-2">Assessment</h3>
            <p>Answer simple questions about your current security practices to establish a baseline.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4 text-blue-600">📊</div>
            <h3 className="text-xl font-bold mb-2">Analysis</h3>
            <p>Receive a detailed breakdown of your security strengths and vulnerabilities.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4 text-blue-600">🛡️</div>
            <h3 className="text-xl font-bold mb-2">Protection</h3>
            <p>Get actionable recommendations to improve your cybersecurity posture and protect your business.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;