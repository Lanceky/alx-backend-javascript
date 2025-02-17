// 5-payment.test.js
const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
    let consoleSpy;

    beforeEach(() => {
        // Set up the spy before each test
        consoleSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        // Restore the spy after each test
        consoleSpy.restore();
    });

    it('should log the correct total for 100 and 20', () => {
        sendPaymentRequestToApi(100, 20);
        expect(consoleSpy.calledOnceWith('The total is: 120')).to.be.true;
        expect(consoleSpy.calledOnce).to.be.true;
    });

    it('should log the correct total for 10 and 10', () => {
        sendPaymentRequestToApi(10, 10);
        expect(consoleSpy.calledOnceWith('The total is: 20')).to.be.true;
        expect(consoleSpy.calledOnce).to.be.true;
    });
});
