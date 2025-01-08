// 8-api/api.test.js
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

    it('should return the correct content type for GET /', (done) => {
        request.get(`${baseUrl}/`, (err, res, body) => {
            expect(res.headers['content-type']).to.include('text/html');
            done();
        });
    });
});
