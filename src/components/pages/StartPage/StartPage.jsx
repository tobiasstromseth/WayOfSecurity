import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

const StartPage = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate('/assessment');
  };
  
  return (
    <div className="page-container">
      <header className="header">
        <div className="header-left">
        <h1 className="title">BS<span className="exclamation">!</span>KKERHET</h1>
        <h2 className="subtitle">Dette verktøyet er utviklet med et solid fundament i anerkjent forskning og beste praksis innen cybersikkerhet. Tiltakene som benyttes er hentet fra flere ledende kilder, blant annet CIS Controls, NSMs grunnprinsipper for IKT-sikkerhet og NIST Cybersecurity Framework (CSF), samt andre ressurser som bidrar til å sikre en helhetlig tilnærming til digital sikkerhet.</h2>
        </div>
        <div className="header-right">
        <h1 className="title">START SELVTEST</h1>
        <p>Placeholder bilde</p>
        </div>
      </header> 
      <header className='background-header'></header>
      
      <section className="info-section">
        <h2>Om verktøyet</h2>
        <p>
          Velkommen til [Produtti] - verktøyet som gjør digital sikkerhet enkelt for deg og din bedrift.
          <br /><br />
          Vi har samlet essensen fra ledende sikkerhetsstandarder som NSMs grunnprinsipper, CIS Controls og NIST Cybersecurity Framework, og omformet dem til konkrete råd som passer perfekt for små og mellomstore bedrifter.
          <br /><br />
          Ingen teknisk ekspertise nødvendig – bare ærlige svar på enkle spørsmål.
          <br /><br />
          Små bedrifter er spesielt sårbare for digitale trusler, men mangler ofte ressursene til omfattende sikkerhetsarbeid. Derfor er [Produtti] skreddersydd for nettopp din virksomhets behov, med fokus på de mest effektive tiltakene som gir størst gevinst med minst mulig ressursbruk. Alle anbefalinger er basert på dokumentert beste praksis, men forenklet for å passe bedrifter med 1-20 ansatte.
          <br /><br />
          Ved å bruke bare [tidsestimat] på denne vurderingen får du en praktisk handlingsplan som styrker din digitale sikkerhet uten behov for IT-avdeling eller store investeringer. Verktøyet er designet for bedriftseiere og ledere som deg, som vil beskytte virksomheten med enkle, forståelige tiltak.
          <br /><br />
          Start reisen mot tryggere digitale løsninger i dag!
        </p>
        
        <h3>Funksjoner:</h3>
        <ul className="feature-list">
          <li>Rask vurdering av din cybersikkerhet</li>
          <li>Personlige anbefalinger basert på dine svar</li>
          <li>Enkel visualisering av styrker og svakheter</li>
          <li>Praktiske tiltak som forbedrer sikkerheten</li>
        </ul>

        <h3>[Produtti] er forankret i følgende anerkjente sikkerhetsstandarder:</h3>
        <ul className="feature-list">
          <li>NSMs grunnprinsipper for IKT-sikkerhet</li>
          <li>CIS Controls V8 (Center for Internet Security)</li>
          <li>NIST Cybersecurity Framework</li>
          <li>NISTIR 7621 (Small Business Information Security)</li>
          <li>NorSIS sikkerhetsveiledninger</li>
          <li>Datatilsynets anbefalinger for informasjonssikkerhet</li>
        </ul>
        
        <button className="start-button" onClick={handleStart}>Start vurdering</button>
      </section>
    </div>
  );
};

export default StartPage;