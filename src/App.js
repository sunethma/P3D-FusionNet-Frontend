import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import MainContent from './components/MainContent';
import History from './components/History';
import { AppStateProvider } from './components/AppStateContext';
import './App.css';

function App() {
  return (
    <AppStateProvider>
      <Router>
        <div className="app relative">
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppStateProvider>
  );
}

export default App;