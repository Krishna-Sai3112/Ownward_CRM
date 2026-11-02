import { describe, expect, it } from 'vitest';

import { escapeSqlLikePattern } from 'src/logic-functions/utils/escape-sql-like-pattern.util';

describe('escapeSqlLikePattern', () => {
  it('should leave a plain email untouched', () => {
    expect(escapeSqlLikePattern('ada@ownward.agency')).toBe('ada@ownward.agency');
  });

  it('should escape underscores', () => {
    expect(escapeSqlLikePattern('john_doe@ownward.agency')).toBe(
      'john\\_doe@ownward.agency',
    );
  });

  it('should escape percent signs and backslashes', () => {
    expect(escapeSqlLikePattern('a%b\\c')).toBe('a\\%b\\\\c');
  });
});
