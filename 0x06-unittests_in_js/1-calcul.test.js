const assert = require('assert');
const calculateNumber = require('./1-calcul.js');

describe('Testing calculateNumber function', () => {
    
    describe('SUM operation', () => {
        it('should correctly add rounded values', () => {
            assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
        });
    });
    
    describe('SUBTRACT operation', () => {
        it('should correctly subtract rounded values', () => {
            assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
        });
    });
    
    describe('DIVIDE operation', () => {
        it('should correctly divide rounded values', () => {
            assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
        });
        
        it('should return "Error" when dividing by 0', () => {
            assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
        });
    });
});
