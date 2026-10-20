import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { slugify, truncate } from '../src/strings.js';

describe('slugify', () => {
  it('lowercases and joins words with dashes', () => {
    assert.equal(slugify('Hello World'), 'hello-world');
  });

  it('collapses punctuation and trims dashes', () => {
    assert.equal(slugify('  --Hello,   World!!  '), 'hello-world');
  });

  it('transliterates accented characters', () => {
    assert.equal(slugify('Crème Brûlée'), 'creme-brulee');
    assert.equal(slugify('Ångström São Paulo'), 'angstrom-sao-paulo');
  });
});

describe('truncate', () => {
  it('leaves short text alone', () => {
    assert.equal(truncate('short', 10), 'short');
  });

  it('cuts long text and adds a suffix within the limit', () => {
    assert.equal(truncate('The quick brown fox', 10), 'The quick…');
    assert.equal(truncate('abcdefghij', 5, '...'), 'ab...');
  });
});
