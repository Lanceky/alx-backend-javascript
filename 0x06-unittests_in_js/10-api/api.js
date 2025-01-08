const express = require('express');
const app = express();

app.use(express.json());

const PORT = 7865;

// GET /available_payments endpoint
app.get('/available_payments', (req, res) => {
    res.json({
        payment_methods: {
            credit_cards: true,
            paypal: false,
        },
    });
});

// POST /login endpoint
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

