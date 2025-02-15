import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand BTCStra" to="/">BTC-Strategy</Link>
        
        {/* Boton hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="nav-link" to="/performance">Performance</Link>
            </li>
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="nav-link" to="/control-panel">Control Panel</Link>
            </li>
          </ul>
          
          <div className="login-container-nav">
            <Link className="login-button-nav" to="/login">
              <span className="login-icon">₿</span>
              <span className="login-text">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;