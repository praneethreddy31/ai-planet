// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-container">
          <img src={logo} alt="AI Planet Logo" className="logo" />
          <span className="logo-text">formerly DPHI</span>
        </Link>
        
        <div className="header-actions">
          <Link to="/" className="upload-btn">
            <i className="fas fa-upload"></i> Upload PDF
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
