import { isValidDomain } from '@/utils/url/isValidDomain';

describe('isValidDomain', () => {
  it.each([
    'ownward.agency',
    'https://www.ownward.agency/careers?x=1',
    'blog.ownward.agency',
    'twenty.co.uk',
    'münchen.de',
    'ownward.agency.',
    'ownward.agency:8080',
  ])('should accept %s', (rawDomain) => {
    expect(isValidDomain(rawDomain)).toBe(true);
  });

  it.each([
    'not a domain',
    'twenty',
    'javascript:alert(1)',
    '<script>',
    'localhost',
    '192.168.1.1',
    '',
  ])('should reject %s', (rawDomain) => {
    expect(isValidDomain(rawDomain)).toBe(false);
  });

  it('should judge a backslash host the way a browser reads it', () => {
    expect(isValidDomain('ownward.agency\\@evil.com')).toBe(true);
    expect(isValidDomain('ownward.agency\\@not a domain')).toBe(true);
  });
});
