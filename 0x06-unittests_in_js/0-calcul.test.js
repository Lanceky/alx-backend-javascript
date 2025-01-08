const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('should return the sum of two whole numbers', () => {
    assert.strictEqual(calculateNumber(1, 3), 4);
  });

  it('should round the first number and return the correct sum', () => {
    assert.strictEqual(calculateNumber(1.6, 3), 5);
    assert.strictEqual(calculateNumber(1.4, 3), 4);
  });

  it('should round the second number and return the correct sum', () => {
    assert.strictEqual(calculateNumber(1, 3.7), 5);
    assert.strictEqual(calculateNumber(1, 3.2), 4);
  });

  it('should round both numbers and return the correct sum', () => {
    assert.strictEqual(calculateNumber(1.5, 3.7), 6);
    assert.strictEqual(calculateNumber(1.4, 3.4), 4);
  });

  it('should handle negative numbers correctly', () => {
    assert.strictEqual(calculateNumber(-1.4, 3.6), 3);
    assert.strictEqual(calculateNumber(-1.6, -3.2), -5);
  });
});
