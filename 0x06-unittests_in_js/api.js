const express = require('express');
const app = express();
const port = 7865;

// Middleware to parse JSON body
app.use(express.json());

// Existing route for /cart/:id
app.get('/cart/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(404).send('Not Found');
  }
  return res.status(200).send(`Payment methods for cart ${id}`);
});

// New route for /available_payments
app.get('/available_payments', (req, res) => {
  const paymentMethods = {
    payment_methods: {
      credit_cards: true,
      paypal: false,
    },
  };
  res.status(200).json(paymentMethods);
});

// New route for /login
app.post('/login', (req, res) => {
  const { userName } = req.body;
  if (userName) {
    return res.status(200).send(`Welcome ${userName}`);
  }
  return res.status(400).send('Username is required');
});

// Start the server
app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});

module.exports = app;

