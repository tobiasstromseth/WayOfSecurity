import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CYBER ATTACK!</h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            15 Ways to Protect Your Business From A Security Breach
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;