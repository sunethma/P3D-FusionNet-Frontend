import React, { useRef, forwardRef } from 'react';
import placeholderLogo from '../assets/p3d-logo.png';

const ImageDisplay = forwardRef(({ image, alt, placeholder, onChange, readOnly = false }, ref) => {
  // Create internal ref if no external ref is provided
  const internalFileInputRef = useRef(null);
  // Use the passed ref if available, otherwise use the internal one
  const fileInputRef = ref || internalFileInputRef;
  
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
});

// Add display name for better debugging
ImageDisplay.displayName = 'ImageDisplay';

export default ImageDisplay;