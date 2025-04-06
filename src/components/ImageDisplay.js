// components/ImageDisplay.js
import React, { useRef } from 'react';
import placeholderLogo from '../assets/p3d-logo.png';

function ImageDisplay({ image, alt, placeholder, onChange, readOnly = false }) {
  const fileInputRef = useRef(null);

  const handleContainerClick = () => {
    if (!readOnly && fileInputRef.current) {
    
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={`image-display ${!image ? 'empty' : ''} ${readOnly ? 'readonly' : ''}`}
      onClick={handleContainerClick}
    >
      {image ? (
        <img src={image} alt={alt} className="display-image" />
      ) : (
        <div className="placeholder">
          <img src={placeholderLogo} alt="Logo" className="placeholder-logo" />
          <p>{placeholder}</p>
        </div>
      )}
      
      {!readOnly && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={onChange}
          accept="image/*"
          className="file-input"
        />
      )}
    </div>
  );
}

export default ImageDisplay;