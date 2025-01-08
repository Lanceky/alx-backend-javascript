// 9-api/api.test.js
const request = require('request');
const { expect } = require('chai');

describe('Index Page', () => {
    const baseUrl = 'http://localhost:7865';

    it('should return the correct status code for GET /', (done) => {
        request.get(`${baseUrl}/`, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('should return the correct response body for GET /', (done) => {
        request.get(`${baseUrl}/`, (err, res, body) => {
            expect(body).to.equal('Welcome to the payment system');
            done();
        });
    });
});

describe('Cart Page', () => {
    const baseUrl = 'http://localhost:7865/cart';

    it('should return the correct status code and body for a valid cart ID', (done) => {
        request.get(`${baseUrl}/12`, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            expect(body).to.equal('Payment methods for cart 12');
            done();
        });
    });

    it('should return 404 for an invalid cart ID (non-numeric)', (done) => {
        request.get(`${baseUrl}/abc`, (err, res, body) => {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });

    it('should return 404 for a missing cart ID', (done) => {
        request.get(`${baseUrl}/`, (err, res, body) => {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });
});
