import React, { useState } from 'react';

export function ReviewPopup({ onClose, onCancelKeepNotification }) {
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
  
    const handleStarClick = (selectedRating) => {
      setRating(selectedRating);
      setError('');
    };
  
    const handleSubmit = () => {
      if (rating === 0) {
        setError('Please select a star rating before submitting!');
        return;
      }
      // TODO: Add actual review submission logic
      console.log(`Submitted rating: ${rating}`);
      onClose();
    };
  
    const handleCancel = () => {
      // Keep the notification visible when canceling
      onCancelKeepNotification();
    };
  
    return (
      <div className="review-popup-overlay">
        <div className="review-popup">
          <h2>How was your Journey?</h2>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'selected' : ''}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
          <button 
            className="submit-review-button" 
            onClick={handleSubmit}
          >
            Submit the Review
          </button>
          <button 
            className="close-review-button" 
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
  
  export default ReviewPopup;
  
  