const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  describe('type = SUM', () => {
    it('should return the sum of two rounded numbers', () => {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
      expect(calculateNumber('SUM', 2.4, 3.5)).to.equal(6);
      expect(calculateNumber('SUM', -1.4, 4.5)).to.equal(4);
    });
  });

  describe('type = SUBTRACT', () => {
    it('should return the subtraction of two rounded numbers', () => {
      expect(calculateNumber('SUBTRACT', 5.4, 3.2)).to.equal(2);
      expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
      expect(calculateNumber('SUBTRACT', -1.4, 4.5)).to.equal(-6);
    });
  });

  describe('type = DIVIDE', () => {
    it('should return the division of two rounded numbers', () => {
      expect(calculateNumber('DIVIDE', 7.4, 3.2)).to.equal(2.5);
      expect(calculateNumber('DIVIDE', 9.4, 4.5)).to.equal(2);
    });

    it('should return "Error" when dividing by 0', () => {
      expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
    });
  });

  describe('Invalid type', () => {
    it('should throw an error for invalid operation type', () => {
      expect(() => calculateNumber('INVALID', 1, 2)).to.throw('Invalid operation type');
    });
  });
});
