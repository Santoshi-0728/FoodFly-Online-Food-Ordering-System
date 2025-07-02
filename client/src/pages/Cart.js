// src/pages/Cart.js
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const deliveryLocations = [
  { name: 'Beeramguda', distance: 6.5 },
  { name: 'Miyapur', distance: 3 },
  { name: 'Lingampally', distance: 5 },
  { name: 'Kondapur', distance: 8 },
  { name: 'Gachibowli', distance: 9 },
  { name: 'Bachupally', distance: 9 },
  { name: 'Ashoknagar', distance: 7.5 },
  { name: 'Gandimaisamma', distance: 9.5 },
  { name: 'Chandanagar', distance: 0 }
];

export default function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [houseDetails, setHouseDetails] = useState('');
  const [distanceKm, setDistanceKm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const location = deliveryLocations.find(loc => loc.name === selectedLocation);
    setDistanceKm(location ? location.distance : null);
  }, [selectedLocation]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = totalPrice * 0.05;
  const packingCharge = totalItems * 5;

  let deliveryFee = 0;
  let deliveryMessage = "";

  if (!selectedLocation) {
    deliveryMessage = "Please select your delivery location.";
  } else if (distanceKm <= 3) {
    deliveryFee = 0;
    deliveryMessage = ` Free delivery (${distanceKm} km)`;
  } else if (distanceKm <= 6) {
    deliveryFee = 25;
    deliveryMessage = `₹25 delivery fee (${distanceKm} km)`;
  } else if (distanceKm <= 10) {
    deliveryFee = 45;
    deliveryMessage = `₹45 delivery fee (${distanceKm} km)`;
  } else if (distanceKm <= 20) {
    deliveryFee = 70;
    deliveryMessage = `₹70 delivery fee (${distanceKm} km)`;
  } else {
    deliveryMessage = ` Cannot deliver to ${selectedLocation} (Distance: ${distanceKm} km exceeds 20 km limit)`;
  }

  const grandTotal = distanceKm <= 20 ? totalPrice + gst + packingCharge + deliveryFee : null;
  const canPlaceOrder = selectedLocation && houseDetails.trim() && distanceKm <= 20;

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');

    const fullAddress = `${houseDetails}, ${selectedLocation}`;
    const finalAmount = totalPrice + gst + packingCharge + deliveryFee;

    try {
      const response = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cartItems,
          total: finalAmount,
          address: fullAddress
        })
      });

      const data = await response.json();

      if (!response.ok || !data.message) {
        throw new Error(data.error || 'Failed to place order');
      }

      
      navigate('/confirmation', {
        state: {
          items: cartItems,
          total: finalAmount,
          address: fullAddress
        }
      });

      clearCart();
      setSelectedLocation('');
      setHouseDetails('');
    } catch (error) {
      setError(' Failed to place order. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1>Your Cart</h1>

        {/* Address Section */}
        <div className="address-section">
          <label htmlFor="location"> Select Delivery Location:</label>
          <select
            id="location"
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
          >
            <option value="">-- Choose Location --</option>
            {deliveryLocations.map((loc, idx) => (
              <option key={idx} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>

          {selectedLocation && (
            <>
              <p className="delivery-msg">{deliveryMessage}</p>
              {distanceKm <= 20 && (
                <>
                  <label htmlFor="house"> House / Flat / Street:</label>
                  <input
                    type="text"
                    id="house"
                    placeholder="e.g. Flat 201, Sai Residency, Street 3"
                    value={houseDetails}
                    onChange={e => setHouseDetails(e.target.value)}
                  />
                  {houseDetails && (
                    <p className="full-address">
                      Delivering to: <strong>{houseDetails}, {selectedLocation}</strong>
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Bill Summary */}
            <div className="bill-summary">
              <p>Subtotal: ₹{totalPrice.toFixed(2)}</p>
              <p>GST (5%): ₹{gst.toFixed(2)}</p>
              <p>Packing Charges: ₹{packingCharge}</p>
              <p>Delivery Fee: {distanceKm > 20 ? ' Not Deliverable' : `₹${deliveryFee}`}</p>
              <h3>
                Grand Total:{' '}
                {distanceKm > 20 ? 'Not Deliverable' : `₹${grandTotal.toFixed(2)}`}
              </h3>

              {/* Loading & Error Messages */}
              {loading && <p> Placing your order, please wait...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}

              <button
                className="place-order"
                disabled={!canPlaceOrder || loading}
                onClick={handlePlaceOrder}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
