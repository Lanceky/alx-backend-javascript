// api.test.js
const request = require('supertest');
const app = require('./api');

describe('Test / endpoint', () => {
  it('should return the welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome to the payment system');
  });
});

describe('Test /cart/:id endpoint', () => {
  it('should return the payment methods for a valid cart ID', async () => {
    const response = await request(app).get('/cart/123');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Payment methods for cart 123');
  });

  it('should return 400 for invalid cart ID', async () => {
    const response = await request(app).get('/cart/abc');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Invalid cart ID');
  });
});

describe('Test /available_payments endpoint', () => {
  it('should return the correct payment methods', async () => {
    const response = await request(app).get('/available_payments');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      payment_methods: {
        credit_cards: true,
        paypal: false
      }
    });
  });
});

describe('Test /login endpoint', () => {
  it('should return a welcome message with username', async () => {
    const response = await request(app)
      .post('/login')
      .send({ userName: 'Betty' })
      .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome Betty');
  });

  it('should return 400 for missing username', async () => {
    const response = await request(app)
      .post('/login')
      .send({})
      .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Missing userName');
  });
});
