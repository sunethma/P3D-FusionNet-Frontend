// components/Footer.js
import React from 'react';
import logo from '../assets/p3d-logo.png';
import footerLogo from '../assets/p3d-footer-logo.png'; // Add this new import



function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="footer-logo-container">
        <img src={footerLogo} alt="P3D-FusionNet Logo" className="footer-logo" />


        </div>
      </div>
      
      <div className="footer-section">
        <h3>Site Navigation</h3>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h3>Information</h3>
        <ul>
          <li><a href="#terms">Terms & Conditions</a></li>
          <li><a href="#privacy">Privacy & Policy</a></li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h3>Contact Us</h3>
        <ul className="contact-info">
          <li><i className="phone-icon"></i> Tel: 0765784993</li>
          <li><i className="email-icon"></i> Email: sunethma.20210246@iit.ac.lk</li>
          <li><i className="location-icon"></i> Address: No 1/A, Ashoka Mawaths, Panadura</li>
        </ul>
      </div>
      
      <div className="footer-section">
        <div className="large-logo">
        { <img src={logo} alt="P3D-FusionNet Logo" className="footer-logo1" /> }
          <span className="large-p"> </span>
        </div>
      </div>
      
      <div className="copyright">
        <p>Copyright © 2025 FusionNet. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;