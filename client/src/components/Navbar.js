import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const showBack = location.pathname !== '/';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {showBack && (
          <button className="back-button" onClick={() => navigate(-1)}>
             Back
          </button>
        )}
        <h2 className="logo">FoodFly</h2>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
}
