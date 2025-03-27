import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => {
  // Bruk en ref for å lagre div-elementet, slik at det ikke skapes på nytt ved hver render
  const elRef = useRef(null);
  
  // Opprett div-elementet kun én gang
  if (elRef.current === null) {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.zIndex = '9998';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '100vw';
    div.style.height = '100vh';
    elRef.current = div;
  }
  
  // Effect for mounting and unmounting the portal element
  useEffect(() => {
    const el = elRef.current;
    
    // Add the element to the body
    document.body.appendChild(el);
    
    // Add a class to the body to prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Cleanup function
    return () => {
      document.body.removeChild(el);
      document.body.style.overflow = 'auto';
    };
  }, []); // Tomt avhengighetsarray betyr at dette kjøres kun ved første rendering
  
  // Render the children into the portal
  return ReactDOM.createPortal(children, elRef.current);
};

export default ModalPortal;