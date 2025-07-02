// src/pages/Orders.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('❌ Failed to fetch orders:', err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h1>📦 Order History</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => {
            const items = JSON.parse(order.items);

            return (
              <div className="order-card" key={index}>
                <h2>Order #{order.id}</h2>
                <p><strong>📍 Address:</strong> {order.address}</p>
                <p><strong>🕒 Ordered On:</strong> {new Date(order.created_at).toLocaleString()}</p>

                <table>
                  <thead>
                    <tr>
                      <th>Food Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price}</td>
                        <td>₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 className="total-line">Grand Total: ₹{order.total.toFixed(2)}</h3>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
