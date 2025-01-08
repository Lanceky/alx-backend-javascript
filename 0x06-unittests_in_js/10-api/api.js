// api.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const PORT = 7865;

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

// Route to handle cart payment methods
app.get('/cart/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.status(400).send('Invalid cart ID');
  } else {
    res.send(`Payment methods for cart ${id}`);
  }
});

// Endpoint to get available payment methods
app.get('/available_payments', (req, res) => {
  res.json({
    payment_methods: {
      credit_cards: true,
      paypal: false
    }
  });
});

// Endpoint to handle login
app.post('/login', (req, res) => {
  const { userName } = req.body;
  if (userName) {
    res.send(`Welcome ${userName}`);
  } else {
    res.status(400).send('Missing userName');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`API available on localhost port ${PORT}`);
});

module.exports = app;
