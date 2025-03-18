import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">Cyber Security Shield &copy; {new Date().getFullYear()} | A simple security solution for small businesses</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center">
            t
          </a>
          <a href="#" className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center">
            f
          </a>
          <a href="#" className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center">
            in
          </a>
          <a href="#" className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center">
            ig
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;