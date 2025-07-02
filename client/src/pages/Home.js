import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home-wrapper">
        <div className="home-content">
          <div className="text-section">
            <h1>Welcome to <span className="highlight">FoodFly</span></h1>
            <h2>Your Cravings, Delivered Fresh!</h2>
            <p>From spicy tiffins to sweet desserts — we've got it all, hot and ready.</p>
            <Link to="/menu">
              <button className="menu-button">Explore Menu </button>
            </Link>
          </div>
          <div className="image-section">
            <img src="/images/homeImage.png" alt="Delicious Food" />
          </div>
        </div>
      </div>
    </>
  );
}
