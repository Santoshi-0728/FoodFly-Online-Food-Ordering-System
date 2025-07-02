require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const db = require('./db'); 

const app = express();
app.use(cors());
app.use(express.json());

// Root
app.get('/', (req, res) => {
  res.send('FoodFly API is running...');
});

// Place Order
app.post('/api/order', (req, res) => {
  const { items, total, address } = req.body;

  if (!items || !Array.isArray(items) || !total || !address) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  const query = 'INSERT INTO orders (items, total, address) VALUES (?, ?, ?)';
  const values = [JSON.stringify(items), total, address];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving order:', err);
      return res.status(500).json({ error: 'Failed to place order' });
    }

    res.status(200).json({
      message: 'Order placed successfully',
      orderId: result.insertId
    });
  });
});

// Get Orders
app.get('/api/orders', (req, res) => {
  db.query('SELECT * FROM orders ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Failed to fetch orders:', err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }

    const parsedResults = results.map(order => {
      let parsedItems = [];

      try {
        parsedItems = JSON.parse(order.items);
      } catch (e) {
        console.warn(`Failed to parse items for order ID ${order.id}`);
      }

      return {
        id: order.id,
        total: order.total,
        address: order.address,
        created_at: order.created_at,
        items: parsedItems
      };
    });

    res.status(200).json(parsedResults);
  });
});

// Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO contact_queries (name, email, message) VALUES (?, ?, ?)';
  const values = [name, email, message];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving contact form:', err);
      return res.status(500).json({ error: 'Failed to save contact form' });
    }

    res.status(200).json({ message: 'Message received!' });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
