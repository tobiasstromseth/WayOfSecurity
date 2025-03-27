import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="left-container-header">
          <h1 className="header-title">BS<span className="exclamation">!</span>KKERHET</h1>
        </div>
        <div className='btn-container'>
          <button className='header-btn'><p>Hjem</p></button> 
          <button className='header-btn'><p>Test</p></button>
          <button className='header-btn'><p>Resultat</p></button>
        </div>
        <div className="vikings-container">
          <div className='vikings'>👨‍🦰👨‍🦱👨‍🦳💂‍♂️</div>
        </div>
      </header>
      <div className='backround-header'></div>
    </>
  );
};

export default Header;