// src/pages/Contact.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (response.ok) {
      alert(' Thank you! We\'ll get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } else {
      alert(` ${data.error || 'Something went wrong. Please try again.'}`);
    }
  } catch (error) {
    console.error(' Contact form error:', error);
    alert(' Something went wrong. Please try again.');
  }
};


  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1> Contact Us</h1>
        <p>If you have questions, feedback, or queries — drop us a message!</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        {status && (
          <p style={{ marginTop: '15px', fontWeight: 'bold', color: status.startsWith('') ? 'green' : 'red' }}>
            {status}
          </p>
        )}
      </div>
    </>
  );
}
