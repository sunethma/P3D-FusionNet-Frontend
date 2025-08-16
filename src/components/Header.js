import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/p3d-logo.png';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <button className="back-button">
          <i className="arrow-left"></i>
        </button>
        <div className="logo-container">
          <img src={logo} alt="P3D-FusionNet Logo" className="logo" />
          <span className="logo-text">P3D-FusionNet</span>
        </div>
      </div>
      
      <nav className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/history">HISTORY</Link>
        <Link to="/about">ABOUT</Link>
        {/* <Link to="/contact">CONTACT</Link> */}
      </nav>
      
      <div className="user-profile">
        <i className="user-icon"></i>
      </div>
    </header>
  );
}

export default Header;