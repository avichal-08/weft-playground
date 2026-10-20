import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { paginate } from '../src/paginate.js';

const items = Array.from({ length: 23 }, (_, i) => i + 1);

describe('paginate', () => {
  it('returns the first page', () => {
    const page = paginate(items, 1, 10);
    assert.deepEqual(page.items, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.equal(page.hasPrev, false);
    assert.equal(page.hasNext, true);
  });

  it('returns a partial last page', () => {
    const page = paginate(items, 3, 10);
    assert.deepEqual(page.items, [21, 22, 23]);
    assert.equal(page.totalPages, 3);
    assert.equal(page.hasNext, false);
  });

  it('returns an empty page past the end', () => {
    assert.deepEqual(paginate(items, 4, 10).items, []);
  });

  it('treats an empty list as one empty page', () => {
    assert.deepEqual(paginate([], 1, 10), {
      items: [],
      page: 1,
      perPage: 10,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    });
  });

  it('rejects invalid arguments', () => {
    assert.throws(() => paginate(items, 0, 10), RangeError);
    assert.throws(() => paginate(items, 1, 0), RangeError);
    assert.throws(() => paginate(items, 1.5, 10), RangeError);
  });
});
