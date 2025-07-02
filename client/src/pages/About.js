import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';

export default function About() {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-hero">
          <h1> About FoodFly</h1>
          <p>Your delicious partner for homely and hot food, delivered from Chandanagar, Hyderabad!</p>
        </div>

        <div className="about-section">
          <h2> Our Story</h2>
          <p>
            FoodFly started with a simple goal — to bring freshly prepared meals right to your doorstep. 
            We are a passionate team of food lovers and tech enthusiasts from Hyderabad who believe 
            in combining technology with tasty food to create a delightful experience.
          </p>
        </div>

        <div className="about-section">
          <h2> Our Delivery</h2>
          <p>
            Our restaurant is based in <strong>Chandanagar, Hyderabad</strong>, located near GSM Mall.
            We deliver within a radius of 10 kilometers — including areas like Beeramguda, Miyapur, 
            Gachibowli, and more. Our delivery system is fast, reliable, and ensures your food arrives hot and fresh!
          </p>
        </div>

        

        <div className="about-footer">
          <p>Made with ❤️ by Team FoodFly • © 2025</p>
        </div>
      </div>
    </>
  );
}
