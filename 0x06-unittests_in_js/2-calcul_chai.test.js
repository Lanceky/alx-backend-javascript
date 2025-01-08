const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  describe('SUM', () => {
    it('should return the sum of two numbers', () => {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
    });
  });

  describe('SUBTRACT', () => {
    it('should return the subtraction of two numbers', () => {
      expect(calculateNumber('SUBTRACT', 5.4, 3.2)).to.equal(2);
    });
  });

  describe('DIVIDE', () => {
    it('should return the division of two numbers', () => {
      expect(calculateNumber('DIVIDE', 7.4, 3.2)).to.equal(2.5);
    });

    it('should return "Error" when dividing by 0', () => {
      expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
    });
  });

  it('should throw an error for invalid operation type', () => {
    expect(() => calculateNumber('INVALID', 1, 2)).to.throw('Invalid operation type');
  });
});
