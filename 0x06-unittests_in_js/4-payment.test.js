// 4-payment.test.js
const sinon = require('sinon');
const { expect } = require('chai');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
    it('should stub Utils.calculateNumber and verify console.log output', () => {
        // Stub Utils.calculateNumber to return a fixed value
        const stub = sinon.stub(Utils, 'calculateNumber').returns(10);

        // Spy on console.log
        const consoleSpy = sinon.spy(console, 'log');

        // Call the function
        sendPaymentRequestToApi(100, 20);

        // Verify the stub was called with the correct arguments
        expect(stub.calledOnceWith('SUM', 100, 20)).to.be.true;

        // Verify console.log output
        expect(consoleSpy.calledOnceWith('The total is: 10')).to.be.true;

        // Restore the original functions
        stub.restore();
        consoleSpy.restore();
    });
});
