import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="left-container-header">
        <h1 className="header-title">BS<span className="exclamation">!</span>KKERHET</h1>
      </div>
      <div className='btn-container'>
        <button className='header-btn'>Start</button>
        <button className='header-btn'>Test</button>
        <button className='header-btn'>Resultat</button>
      </div>
      <div className="vikings-container">
        <div style={{ fontSize: '40px' }}>👨‍🦰👨‍🦱👨‍🦳</div>
      </div>
    </header>
  );
};

export default Header;