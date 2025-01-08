const request = require('request');
const { expect } = require('chai');

describe('API integration testing', () => {
  const API_URL = 'http://localhost:7865';

  describe('GET /', () => {
    it('returns correct response', (done) => {
      request.get(API_URL, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome to the payment system');
        done();
      });
    });
  });

  describe('GET /cart/:id', () => {
    it('returns correct response when :id is a number', (done) => {
      request.get(`${API_URL}/cart/12`, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 12');
        done();
      });
    });

    it('returns 404 when :id is not a number', (done) => {
      request.get(`${API_URL}/cart/hello`, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(body).to.equal('Invalid cart ID');
        done();
      });
    });
  });

  describe('GET /available_payments', () => {
    it('returns correct payment methods object', (done) => {
      request.get(`${API_URL}/available_payments`, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        const expectedPaymentMethods = {
          payment_methods: {
            credit_cards: true,
            paypal: false
          }
        };
        expect(JSON.parse(body)).to.deep.equal(expectedPaymentMethods);
        done();
      });
    });
  });

  describe('POST /login', () => {
    it('returns correct welcome message', (done) => {
      const options = {
        url: `${API_URL}/login`,
        json: { userName: 'Betty' },
        headers: { 'Content-Type': 'application/json' }
      };
      request.post(options, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome Betty');
        done();
      });
    });
  });
});
