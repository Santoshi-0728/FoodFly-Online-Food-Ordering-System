// src/pages/Confirmation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Confirmation.css';

export default function Confirmation() {
  const location = useLocation();
  const { items, total, address } = location.state || {};

  return (
    <>
      <Navbar />
      <div className="confirmation-container">
        <h1> Order Confirmed!</h1>
        <p>Thank you for ordering with <strong>FoodFly</strong>.</p>

        {items?.length ? (
          <>
            <div className="summary-box">
              <h2>🛒 Your Order Summary</h2>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong> Delivery Address:</strong> {address}</p>
              <h3>Total: ₹{total.toFixed(2)}</h3>
            </div>
          </>
        ) : (
          <p>No order details found.</p>
        )}

        <Link to="/menu">
          <button className="back-to-menu"> Order More</button>
        </Link>
      </div>
    </>
  );
}
