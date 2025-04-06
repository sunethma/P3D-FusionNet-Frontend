import React from 'react';


const ImageTypeErrorModal = ({ onClose }) => {
  return (
    <div className="error-modal-overlay">
      <div className="error-modal-container">
        <svg 
          className="error-modal-icon" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h2 className="error-modal-title">Invalid File Type</h2>
        <p className="error-modal-message">
          Please upload only PNG or JPEG images.
        </p>
        <button 
          onClick={onClose}
          className="error-modal-button"
        >
          Understood
        </button>
      </div>
    </div>
  );
};

export default ImageTypeErrorModal;