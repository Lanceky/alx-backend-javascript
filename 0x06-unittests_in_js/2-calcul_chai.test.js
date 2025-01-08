const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai.js');

describe('Testing calculateNumber function with Chai', () => {
    
    describe('SUM operation', () => {
        it('should correctly add rounded values', () => {
            expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
        });
    });
    
    describe('SUBTRACT operation', () => {
        it('should correctly subtract rounded values', () => {
            expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
        });
    });
    
    describe('DIVIDE operation', () => {
        it('should correctly divide rounded values', () => {
            expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
        });
        
        it('should return "Error" when dividing by 0', () => {
            expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
        });
    });
});
