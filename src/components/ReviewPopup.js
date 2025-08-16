// Updated ReviewPopup.js
import React, { useState } from 'react';

export function ReviewPopup({ onClose, onCancelKeepNotification, onSubmitReview, image, model }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
   
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    setError('');
  };
   
  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please select a star rating before submitting!');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Call the parent component's submission handler
      await onSubmitReview(rating, feedback);
      onClose();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error('Review submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
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
        
        <textarea
          placeholder="Additional feedback (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="feedback-textarea"
          rows={4}
        />
        
        {error && <p className="error-message">{error}</p>}
        
        <button
          className="submit-review-button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit the Review'}
        </button>
        
        <button
          className="close-review-button"
          onClick={() => onCancelKeepNotification()}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ReviewPopup;