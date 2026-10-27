import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { clamp } from '../src/number.js';

describe('clamp', () => {
  it('clamps value within range', () => {
    assert.equal(clamp(5, 1, 10), 5);
    assert.equal(clamp(-5, 1, 10), 1);
    assert.equal(clamp(15, 1, 10), 10);
  });

  it('works with equal min and max', () => {
    assert.equal(clamp(5, 5, 5), 5);
    assert.equal(clamp(2, 5, 5), 5);
    assert.equal(clamp(8, 5, 5), 5);
  });

  it('throws RangeError if min is greater than max', () => {
    assert.throws(() => clamp(5, 10, 1), RangeError);
  });
});
