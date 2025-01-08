const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const app = require('./api');
const server = require('http').createServer(app);

// Start the server before running tests
before(function(done) {
  server.listen(7865, done);
});

// Close the server after tests
after(function(done) {
  server.close(done);
});

// Test suite for /login endpoint
describe('POST /login', function() {
  it('should return Welcome with the provided username', function(done) {
    const options = {
      url: 'http://localhost:7865/login',
      method: 'POST',
      json: { userName: 'Betty' },
    };
    request(options, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome Betty');
      done();
    });
  });

  it('should return 400 if username is missing', function(done) {
    const options = {
      url: 'http://localhost:7865/login',
      method: 'POST',
      json: {},
    };
    request(options, function(error, response, body) {
      expect(response.statusCode).to.equal(400);
      expect(body).to.equal('Username is required');
      done();
    });
  });
});

// Test suite for /available_payments endpoint
describe('GET /available_payments', function() {
  it('should return the available payment methods', function(done) {
    request('http://localhost:7865/available_payments', function(error, response, body) {
      const expected = {
        payment_methods: {
          credit_cards: true,
          paypal: false,
        },
      };
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body)).to.deep.equal(expected);
      done();
    });
  });
});
