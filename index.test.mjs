import { describe, it, expect } from 'vitest';
import A from './index';

describe('index', () => {
  it('should be a test', () => {
    expect(A).toBeInstanceOf(Function);
  });
});
