import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goToHome = () => {
    navigate('/');
    setMenuOpen(false);
  };

  const goToAssessment = () => {
    navigate('/assessment');
    setMenuOpen(false);
  };

  const goToResults = () => {
    navigate('/results');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="left-container-header">
          <h1 className="header-title">BS<span className="exclamation">!</span>KKERHET</h1>
        </div>
        
        {/* Regular navigation buttons - visible on larger screens */}
        <div className='btn-container desktop-nav'>
          <button className='header-btn' onClick={goToHome}><p>Hjem</p></button> 
          <button className='header-btn' onClick={goToAssessment}><p>Sikkerhetstesten</p></button>
          <button className='header-btn' onClick={goToResults}><p>Resultater</p></button>
        </div>
        
        <div className="vikings-container">
          <div className='vikings'>👨‍🦰👨‍🦱👨‍🦳💂‍♂️</div>
        </div>
        
        {/* Hamburger menu - visible on smaller screens */}
        <div className="hamburger-menu">
          <button className="hamburger-button" onClick={toggleMenu}>
            <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>
      
      {/* Mobile navigation menu */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <button className='mobile-nav-btn' onClick={goToHome}><p>Hjem</p></button> 
        <button className='mobile-nav-btn' onClick={goToAssessment}><p>Sikkerhetstesten</p></button>
        <button className='mobile-nav-btn' onClick={goToResults}><p>Resultater</p></button>
      </div>
      
      <div className='backround-header'></div>
    </>
  );
};

export default Header;