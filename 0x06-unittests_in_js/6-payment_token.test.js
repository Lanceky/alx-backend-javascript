// 6-payment_token.test.js
const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
    it('should resolve with the correct data when success is true', (done) => {
        getPaymentTokenFromAPI(true).then((response) => {
            expect(response).to.deep.equal({ data: 'Successful response from the API' });
            done(); // Signal that the test is complete
        }).catch((err) => done(err)); // Handle any unexpected errors
    });

    it('should return null when success is false', () => {
        const result = getPaymentTokenFromAPI(false);
        expect(result).to.be.null;
    });
});
