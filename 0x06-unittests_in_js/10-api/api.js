const express = require('express');
const app = express();

app.use(express.json());

const PORT = 7865;

// Route GET /
app.get('/', (req, res) => {
    res.send('Welcome to the payment system');
});

// Route GET /cart/:id
app.get('/cart/:id', (req, res) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        return res.status(400).send('Invalid cart id');
    }
    res.send(`Payment methods for cart ${id}`);
});

// Route GET /available_payments
app.get('/available_payments', (req, res) => {
    res.json({
        payment_methods: {
            credit_cards: true,
            paypal: false,
        },
    });
});

// Route POST /login
app.post('/login', (req, res) => {
    const { userName } = req.body;
    if (!userName) {
        return res.status(400).send('Bad Request');
    }
    res.send(`Welcome ${userName}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`API available on localhost port ${PORT}`);
});

module.exports = app;

