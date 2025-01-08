
iconst assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
  describe('SUM', () => {
    it('should return the sum of two numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
      assert.strictEqual(calculateNumber('SUM', 1.4, 3.7), 5);
    });
  });

  describe('SUBTRACT', () => {
    it('should return the subtraction of two numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 5.4, 3.2), 2);
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.7), -4);
    });
  });

  describe('DIVIDE', () => {
    it('should return the division of two numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 7.4, 3.2), 2.5);
    });

    it('should return "Error" when dividing by 0', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
    });
  });

  it('should throw an error for invalid operation type', () => {
    assert.throws(() => calculateNumber('INVALID', 1, 2), /Invalid operation type/);
  });
});
