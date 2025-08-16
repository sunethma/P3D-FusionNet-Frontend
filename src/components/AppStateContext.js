import React, { createContext, useState, useContext } from 'react';

// Create a context for our app state
const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedModel, setGeneratedModel] = useState(null);

  // State management functions
  const updateImage = (image) => {
    setSelectedImage(image);
  };

  const updateModel = (model) => {
    setGeneratedModel(model);
  };

  const clearState = () => {
    setSelectedImage(null);
    setGeneratedModel(null);
  };

  // Value to be provided by the context
  const value = {
    selectedImage,
    generatedModel,
    updateImage,
    updateModel,
    clearState
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook to use the app state
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};