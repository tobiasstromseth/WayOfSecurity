import React from 'react';
import { useNavigate } from 'react-router-dom';
import SecurityImage from '../../../assets/images/18e468bc-bde8-43ad-88b6-459f92947e17_removalai_preview.png';
import './StartPage.css';

const StartPage = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate('/assessment');
  };
  
  return (
    <div className="page-container">
      <header className="start-page-header">
        <div className="header-left">
        <h1 className="title">BS<span className="exclamation">!</span>KKERHET</h1>
        <h2 className="subtitle">Velkommen til Basline sikkerhet (BS!KKERHET) - verktøyet som gjør digital sikkerhet enkelt for deg og din bedrift. 
        <br /><br />Vi har samlet essensen fra ledende sikkerhetsstandarder som NSMs grunnprinsipper, CIS Controls og NIST Cybersecurity Framework, og omformet dem til konkrete råd som passer perfekt for små og mellomstore bedrifter. Ingen teknisk ekspertise nødvendig – bare ærlige svar på enkle spørsmål.</h2>
        </div>
        <div className="header-right">
        <button className="start-test-btn" onClick={handleStart}>START SELVTEST</button>
        <img src={SecurityImage} alt="Sikkerhetsbilde" />
        </div>
      </header> 
      <header className='background-header'></header>
      
      <section className='info-section'>
        <section className="info-section-left">
          <p>
            Små bedrifter er spesielt sårbare for digitale trusler, men mangler ofte ressursene til omfattende sikkerhetsarbeid. Derfor er BSIKKERHET skreddersydd for nettopp din virksomhets behov, med fokus på de mest effektive tiltakene som gir størst gevinst med minst mulig ressursbruk. Alle anbefalinger er basert på dokumentert beste praksis, men forenklet for å passe bedrifter med 1-20 ansatte.
            <br /><br />
            Ved å bruke bare 20 minuitter på denne vurderingen får du en praktisk handlingsplan som styrker din digitale sikkerhet uten behov for IT-avdeling eller store investeringer. Verktøyet er designet for bedriftseiere og ledere som deg, som vil beskytte virksomheten med enkle, forståelige tiltak.
            <br /><br />
            Start reisen mot tryggere digitale løsninger i dag!
          </p>
        </section>
        <section className="info-section-right">
        <div class="cards-container">
          <div class="card features card1">
            <div class="card-header">
              <h3>Funksjoner:</h3>
            </div>
            <ul class="feature-list">
              <li>Rask vurdering av din cybersikkerhet</li>
              <li>Personlige anbefalinger basert på dine svar</li>
              <li>Enkel visualisering av styrker og svakheter</li>
              <li>Praktiske tiltak som forbedrer sikkerheten</li>
            </ul>
          </div>

          <div class="card standards card2">
            <div class="card-header">
              <h3>Forankret i:</h3>
            </div>
            <ul class="feature-list">
              <li>NSMs grunnprinsipper for IKT-sikkerhet</li>
              <li>CIS Controls V8 (Center for Internet Security)</li>
              <li>NIST Cybersecurity Framework</li>
              <li>NISTIR 7621 (Small Business Information Security)</li>
              <li>NorSIS sikkerhetsveiledninger</li>
              <li>Datatilsynets anbefalinger for informasjonssikkerhet</li>
            </ul>
          </div>
          
          <div class="card target-groups card3">
            <div class="card-header">
              <h3>Hvem passer BSIKKERHET for?</h3>
            </div>
            <ul class="feature-list">
              <li>Små og mellomstore bedrifter</li>
              <li>Enkeltpersonforetak og frilansere</li>
              <li>Organisasjoner og foreninger</li>
              <li>IT-ansvarlige med behov for oversikt</li>
              <li>Virksomheter med begrensede IT-ressurser</li>
              <li>Bedrifter som ønsker å styrke sikkerheten</li>
            </ul>
          </div>
        </div>
        </section>
      </section>
    </div>
  );
};

export default StartPage;