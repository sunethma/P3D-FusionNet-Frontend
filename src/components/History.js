import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppState } from './AppStateContext';

const History = () => {
  const [sessionHistory, setSessionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(false);
  const navigate = useNavigate();
  
  // Use the global app state
  const { updateImage, updateModel } = useAppState();

  // Get session history from localStorage
  useEffect(() => {
    const fetchSessionHistory = async () => {
      try {
        setLoading(true);
        
        // Get session history IDs from localStorage
        const sessionIds = JSON.parse(localStorage.getItem('sessionModelIds') || '[]');
        
        if (sessionIds.length === 0) {
          setLoading(false);
          return;
        }
        
        // Fetch metadata for each ID
        const historyItems = await Promise.all(
          sessionIds.map(async (id) => {
            try {
              const response = await axios.get(`http://localhost:5000/api/model/${id}`);
              return response.data;
            } catch (err) {
              console.error(`Error fetching model ${id}:`, err);
              // Return partial data with error flag
              return { id, error: true, message: 'Failed to load this item' };
            }
          })
        );
        
        setSessionHistory(historyItems.filter(item => !item.error));
      } catch (err) {
        console.error('Error loading history:', err);
        setError('Failed to load history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionHistory();
  }, []);

  // Function to load full model data (including image and 3D model)
  const loadModelDetails = async (id) => {
    try {
      setModelLoading(true);
      const response = await axios.get(`http://localhost:5000/api/model/${id}?includeData=true`);
      setSelectedModel(response.data);
    } catch (err) {
      console.error('Error loading model details:', err);
      setError('Failed to load model details. Please try again.');
    } finally {
      setModelLoading(false);
    }
  };

  // Function to reload model in main page
  const reloadModelInEditor = () => {
    if (selectedModel && selectedModel.image && selectedModel.model) {
      // Update the global state directly instead of using sessionStorage
      updateImage(selectedModel.image);
      updateModel(selectedModel.model);
      
      // Navigate to main page
      navigate('/');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="history-container">
      <h2 className="history-title">Your Session History</h2>
      
      {loading ? (
        <div className="loading-message">Loading your history...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : sessionHistory.length === 0 ? (
        <div className="empty-message">
          <p>No models saved in this session yet.</p>
          <p>Generate a 3D model and save it with feedback to see it here!</p>
        </div>
      ) : (
        <div className="history-content">
          <div className="history-list">
            {sessionHistory.map((item) => (
              <div 
                key={item.id} 
                className={`history-item ${selectedModel?.id === item.id ? 'selected' : ''}`}
                onClick={() => loadModelDetails(item.id)}
              >
                <div className="history-item-header">
                  <span className="timestamp">{formatDate(item.createdAt)}</span>
                  <span className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < item.rating ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                </div>
                {item.feedback && (
                  <div className="feedback">
                    <p>{item.feedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {selectedModel && (
            <div className="model-details">
              <h3>Selected Model</h3>
              
              {modelLoading ? (
                <div className="loading-message">Loading model details...</div>
              ) : (
                <>
                  <div className="model-preview">
                    <div className="image-preview">
                      <h4>Original Image</h4>
                      <img 
                        src={selectedModel.image} 
                        alt="Original" 
                        className="preview-image"
                      />
                    </div>
                    
                    <div className="model-metadata">
                      <p><strong>Created:</strong> {formatDate(selectedModel.createdAt)}</p>
                      <p><strong>Rating:</strong> {selectedModel.rating}/5</p>
                      {selectedModel.feedback && (
                        <div>
                          <p><strong>Feedback:</strong></p>
                          <p className="feedback-text">{selectedModel.feedback}</p>
                        </div>
                      )}
                      
                      <button 
                        className="reload-button"
                        onClick={reloadModelInEditor}
                      >
                        Reload in Editor
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;