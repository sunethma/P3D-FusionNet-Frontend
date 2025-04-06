import React from 'react';
import logo from '../assets/p3d-logo.png';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <img src={logo} alt="P3D-FusionNet Logo" className="about-logo" />
          <h1>About P3D-FusionNet</h1>
        </div>
        
        <section className="about-section">
          <h2>What is P3D-FusionNet?</h2>
          <p>
            P3D-FusionNet is an AI-powered single-view 3D reconstruction software that transforms 2D images into highly accurate 3D models. 
            Designed for architects, game developers, and researchers, it enables seamless 3D asset creation with minimal effort.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to make 3D modeling accessible, efficient, and accurate by leveraging cutting-edge AI techniques. 
            Whether you need to reconstruct objects for visualization, simulation, or design, P3D-FusionNet ensures 
            high-quality 3D outputs while minimizing computational overhead.
          </p>
        </section>
        
        <section className="about-section">
          <h2>How It Works</h2>
          <p>
            P3D-FusionNet utilizes advanced feature extraction and fast attention mechanisms to generate precise 3D voxel models from a single 2D image. 
            The process involves:
          </p>
          <ul>
            <li>Feature Extraction – Capturing fine details from the input image</li>
            <li>Efficient Processing – Using transformer-based models to enhance reconstruction accuracy</li>
            <li>Voxel Output Generation – Producing a structured 3D model representation</li>
          </ul>
        </section>
        
        <section className="about-cta">
          <h2>Get Started Today!</h2>
          <p>
            Experience the power of AI-based 3D reconstruction with P3D-FusionNet. 
            Start creating stunning 3D models from just a single image!
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;