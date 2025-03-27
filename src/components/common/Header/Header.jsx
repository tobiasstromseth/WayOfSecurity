import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToAssessment = () => {
    navigate('/assessment');
  };

  const goToResults = () => {
    navigate('/results');
  };

  return (
    <>
      <header className="header">
        <div className="left-container-header">
          <h1 className="header-title">BS<span className="exclamation">!</span>KKERHET</h1>
        </div>
        <div className='btn-container'>
          <button className='header-btn' onClick={goToHome}><p>Hjem</p></button> 
          <button className='header-btn' onClick={goToAssessment}><p>Sikkerhetstesten</p></button>
          <button className='header-btn' onClick={goToResults}><p>Resultater</p></button>
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