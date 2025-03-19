import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => {
  // Create a div that will be mounted directly to the body
  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.zIndex = '9998';
  el.style.top = '0';
  el.style.left = '0';
  el.style.width = '100vw';
  el.style.height = '100vh';
  
  // Effect for mounting and unmounting the portal element
  useEffect(() => {
    // Add the element to the body
    document.body.appendChild(el);
    
    // Add a class to the body to prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Cleanup function
    return () => {
      document.body.removeChild(el);
      document.body.style.overflow = 'auto';
    };
  }, [el]);
  
  // Render the children into the portal
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;