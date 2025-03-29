import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './ModalPortal.css';

const ModalPortal = ({ children, animated = true }) => {
  // Bruk en ref for å lagre div-elementet
  const elRef = useRef(null);
  
  // Opprett div-elementet kun én gang
  if (elRef.current === null) {
    const div = document.createElement('div');
    div.className = 'modal-portal-container';
    elRef.current = div;
  }
  
  // Effect for mounting and unmounting the portal element
  useEffect(() => {
    const el = elRef.current;
    
    // Add the element to the body
    document.body.appendChild(el);
    
    // Add a class to the body to prevent scrolling
    document.body.classList.add('modal-open');
    
    // Cleanup function
    return () => {
      document.body.removeChild(el);
      document.body.classList.remove('modal-open');
    };
  }, []);
  
  // Wrap children with the overlay div that has styling
  const wrappedChildren = (
    <div className={`modal-overlay ${animated ? 'modal-overlay-animated' : ''}`}>
      {children}
    </div>
  );
  
  // Render the children into the portal
  return ReactDOM.createPortal(wrappedChildren, elRef.current);
};

export default ModalPortal;