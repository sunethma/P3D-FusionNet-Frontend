import React from 'react';
    export function ReviewNotification({ onClose, onReview }) {
        return (
          <div className="review-notification">
            <div className="review-notification-content">
              <p>How was your journey?</p>
              <div className="review-notification-actions">
                <button 
                  className="review-notification-button review-now" 
                  onClick={onReview}
                >
                  Review Now
                </button>
                <button 
                  className="review-notification-button review-later" 
                  onClick={onClose}
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        );
      }

export default ReviewNotification;  